---
editLink: https://github.com/btcpayserver/btcpayserver-doc/edit/master/docs/LocalDev.md
---

# Local development

## Prerequisites

For the **development environment** you need to install these tools:

* [.NET Core 3.1 SDK](https://dotnet.microsoft.com/download)
* Docker: [Windows](https://docs.docker.com/docker-for-windows/install/) | [Mac OS](https://docs.docker.com/docker-for-mac/install/) | [Linux](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

## Dependencies

To execute tests and run the project for debugging, you need to run a number of **dependencies**.

We wrapped all our dependencies in a docker-compose file that you can use to bootstrap the development environment:
The file [BTCPayServer.Tests/docker-compose.yml](https://github.com/btcpayserver/btcpayserver/blob/master/BTCPayServer.Tests/docker-compose.yml) can be used to spin everything up:

```bash
git clone https://github.com/btcpayserver/btcpayserver.git
cd btcpayserver/BTCPayServer.Tests
docker-compose up dev
```

## Which IDE?

We recommend using Visual Studio Code (cross platform) or Visual Studio 2019 (Windows Only) or Rider (cross platform).
You can of course use VIM if you are hardcore, .NET Core is command-line environment friendly.

Visual Studio Code, Visual Studio and Rider will run the launch profile `Bitcoin`.
This will run a **BTCPay Server instance connecting to the services in your Docker service**, so you can easily debug and step through the code.

## Build configuration

A build configuration defines how to **build BTCPay Server**. For example, whether to include some source files, whether to optimize for debugging or performance.

There are several build configurations:

* `Debug`
* `Release`
* `Altcoins-Debug`
* `Altcoins-Release`

How to use a different one during your local development depends on your IDE.
By default `Debug` is used, this is a Bitcoin only build excluding any altcoin dependencies. How to use a different one during your local development depends on your IDE.

You can select which build to use via the `-c` switch in `dotnet` command line. If you use command line and want to run a Release build:

```bash
dotnet run -c Release
```

## Launch profiles

When you **start BTCPay Server locally for local development**, it needs the right parameter so it can connect to the development time dependencies in the docker-compose file.

Those parameters are wrapped into the dotnet concept of `launch profile`.

The launch profiles are specified in the [launchSettings.json](https://github.com/btcpayserver/btcpayserver/blob/master/BTCPayServer/Properties/launchSettings.json).

There are currently three launch profiles:

* `Bitcoin`
* `Bitcoin-HTTPS`
* `Altcoins-HTTPS`

By default, `Bitcoin` is used. How to use a different one during your local development depends on your IDE.

If you use command line, `dotnet run` allows you to select the launch profile of your choice:

```bash
dotnet run --launch-profile Bitcoin
```

## Running tests

Running tests is functioning in the exact same way as running the development time BTCPay Server.

```bash
cd BTCPayServer.Tests
dotnet test
```

The concept of `launch profile` does not apply for tests, but the concept of build configuration does. For example, if I want to run tests on the Release build:

```bash
dotnet test -c Release
```

The tests are already configured to use the development time dependencies in the docker-compose presented earlier.

You can use the `--f` (filter) switch to run a specific test.

If you use an IDE, consult your IDE documentation to run tests or switch to different configurations.

## Altcoin support development

By default, your IDE or simple `dotnet run` will use `Bitcoin` launch profile on `Debug` build.

* This means that BTCPay Server will be hosted on a local HTTP port, building without altcoin support,
* Run BTCPay Server to connect to Bitcoin only dependencies specified in [BTCPayServer.Tests/docker-compose.yml](https://github.com/btcpayserver/btcpayserver/blob/master/BTCPayServer.Tests/docker-compose.yml).

If you want to **develop with altcoins support** you need to use the `Altcoins-HTTPS` launch profile, on the `Altcoins-Debug` build, and run the [BTCPayServer.Tests/docker-compose.altcoins.yml](https://github.com/btcpayserver/btcpayserver/blob/master/BTCPayServer.Tests/docker-compose.altcoins.yml).

If using command line:

```bash
cd BTCPayServer.Tests
docker-compose -f docker-compose.altcoins.yml up dev
cd ../BTCPayServer
dotnet run -c Altcoins-Debug --launch-profile Altcoins-HTTPS
```

For tests

```bash
cd BTCPayServer.Tests
dotnet test -c Altcoins-Debug
```

## HTTPS support for local development

Some browser security features may require that you use **HTTPS** to be properly tested.

In this case, use `Bitcoin-HTTPS` (or `Altcoin-HTTPS`) launch profile. This will create a self signed certificate for your development purpose.

However, your browser will not trust it, making it difficult to debug.

You can instruct your OS to trust this development time certificate by running:

```bash
dotnet dev-certs https --trust
```

## Videos

For more information check out these videos:

* [How to contribute to BTCPay Server Development (Windows)](https://youtube.com/watch?v=ZePbMPSIvHM) by Nicolas Dorier
* [Setting up BTCPayServer development environment on Linux (Ubuntu)](https://youtube.com/watch?v=j486T_Rk-yw) by RockStarDev
* [BTCPay Server Development - Testing pull request, payments (MacOS)](https://youtube.com/watch?v=GWR_CcMsEV0) by Pavlenex

and these notes:

* [How to get started with development](https://github.com/btcpayserver/btcpayserver/blob/master/BTCPayServer.Tests/README.md) by Nicolas Dorier (covering relevant docker commands, paying regtest invoices)

## How to manually test payments

### Using the test bitcoin-cli

You can call bitcoin-cli inside the container with `docker exec`.
For example, if you want to send `0.23111090` to `mohu16LH66ptoWGEL1GtP6KHTBJYXMWhEf`:

```sh
./docker-bitcoin-cli.sh sendtoaddress "mohu16LH66ptoWGEL1GtP6KHTBJYXMWhEf" 0.23111090
```

If you are using Powershell:

```powershell
.\docker-bitcoin-cli.ps1 sendtoaddress "mohu16LH66ptoWGEL1GtP6KHTBJYXMWhEf" 0.23111090
```

You can also generate blocks:

```powershell
.\docker-bitcoin-generate.ps1 3
```

### Using Polar to test Lightning payments

- Install and run [Polar](https://lightningpolar.com/). Setup a small network of nodes.
- Go to your store's General Settings and enable Lightning.
- Build your connection string using the Connect infomation in the Polar app.

LND Connection string example: 
type=lnd-rest;server=https://127.0.0.1:8084/;macaroonfilepath="local path to admin.macaroon on your computer, without these quotes";allowinsecure=true

Now you can create a Lightning invoice on BTCPay Server regtest and make a payment through Polar.

PLEASE NOTE: You may get an exception break in Visual Studio. You must quickly click "Continue" in VS so the invoice is generated.
Or, uncheck the box that says, "Break when this exceptiontype is thrown".


### Using the test litecoin-cli

Same as bitcoin-cli, but with `.\docker-litecoin-cli.ps1` and `.\docker-litecoin-cli.sh` instead.

### Using the test lightning-cli

If you are using Linux:

```sh
./docker-customer-lightning-cli.sh pay lnbcrt100u1pd2e6uspp5ajnadvhazjrz55twd5k6yeg9u87wpw0q2fdr7g960yl5asv5fmnqdq9d3hkccqpxmedyrk0ehw5ueqx5e0r4qrrv74cewddfcvsxaawqz7634cmjj39sqwy5tvhz0hasktkk6t9pqfdh3edmf3z09zst5y7khv3rvxh8ctqqw6mwhh
```

If you are using Powershell:

```powershell
.\docker-customer-lightning-cli.ps1 pay lnbcrt100u1pd2e6uspp5ajnadvhazjrz55twd5k6yeg9u87wpw0q2fdr7g960yl5asv5fmnqdq9d3hkccqpxmedyrk0ehw5ueqx5e0r4qrrv74cewddfcvsxaawqz7634cmjj39sqwy5tvhz0hasktkk6t9pqfdh3edmf3z09zst5y7khv3rvxh8ctqqw6mwhh
```

If you get this message:

```json
{ "code" : 205, "message" : "Could not find a route", "data" : { "getroute_tries" : 1, "sendpay_tries" : 0 } }
```

Please, run the test `CanSetLightningServer`, this will establish a channel between the customer and the merchant, then, retry.

Alternatively you can run the `./docker-lightning-channel-setup.sh` script to establish the channel connection.
The `./docker-lightning-channel-teardown.sh` script closes any existing lightning channels.

### Alternative Lightning testing: Using Polar to test Lightning payments

- Install and run [Polar](https://lightningpolar.com/). Setup a small network of nodes.
- Go to your store's General Settings and enable Lightning.
- Build your connection string using the Connect information in the Polar app.

LND Connection string example: 
type=lnd-rest;server=https://127.0.0.1:8084/;macaroonfilepath="local path to admin.macaroon on your computer, without these quotes";allowinsecure=true

Now you can create a lightning invoice on BTCPay Server regtest and make a payment through Polar.

PLEASE NOTE: You may get an exception break in Visual Studio. You must quickly click "Continue" in VS so the invoice is generated.
Or, uncheck the box that says, "Break when this exception type is thrown".

## FAQ

### `docker-compose up dev` failed or tests are not passing, what should I do?

1. Run `docker-compose down --v` (this will reset your test environment)
2. Run `docker-compose pull` (this will ensure you have the lastest images)
3. Run again with `docker-compose up dev`

### How to run the Altcoin environment?

`docker-compose -f docker-compose.altcoins.yml up dev`

If you still have issues, try to restart docker.

### How to run the Selenium test with a browser?

Run `dotnet user-secrets set RunSeleniumInBrowser true` to run tests in browser.

To switch back to headless mode (recommended) you can run `dotnet user-secrets remove RunSeleniumInBrowser`.

### Session not created: This version of ChromeDriver only supports Chrome version 88

When you run tests for selenium, you may end up with this error.
This happen when we update the selenium packages on BTCPay Server while you did not update your chrome version.

If you want to use a older chrome driver on [this page](https://chromedriver.chromium.org/downloads) then point to it with

`dotnet user-secrets set ChromeDriverDirectory "path/to/the/driver/directory"`
