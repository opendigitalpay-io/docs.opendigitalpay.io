---
editLink: https://github.com/btcpayserver/btcpayserver-docker/edit/master/docs/ndlc.md
externalRepo: https://github.com/btcpayserver/btcpayserver-docker
---
# NDLC support

DISCLAIMER: THIS PROJECT IS EXPERIMENTAL BASED ON A PROTOCOL WHICH IS STILL EVOLVING EVERYDAY. USE WITH CAUTION.

I WILL TAKE NO ATTEMPT AT MAINTAINING BACKWARD COMPATIBILITY AT THIS STAGE.

## Introduction

A DLC can be seen as a smart contract involving two `parties`, a future `event`, a set of outcomes and a `payoff function`.
An `outcome` can be `attested` by an `oracle`. The `oracle` does not need to interact with either party, and its only role is to `attest` the outcome of the event.

The `payoff function` determines the two parties' profit or loss depending on which outcome get `attested`.

The `oracle` roles is to define the `event` and `attest` a single outcome of the event.

Let's call Alice and Bob the two parties of the contract, and Olivia the oracle.

A DLC will show two transactions on the chain:
* The Funding Transaction
* The Contract Execution Transaction (CET)

The `Funding Transaction` is a transaction built by the two parties of the contract, locking their collateral for the contract.

The `Contract Execution Transaction` (or `CET`) is the transaction distributing the locked collateral according to the `payoff function` for the outcome attested by the oracle.

The following documentation is also explained in this video.

[<img src="https://img.youtube.com/vi/DakwshnNkho/mqdefault.jpg">](https://youtu.be/DakwshnNkho)

## How to use

You need to add ndlc's docker fragment to your install with:

```bash
BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;opt-add-ndlc"
. btcpay-setup.sh -i
```

You can then use `ndlc-cli.sh` to run use ndlc-cli, for example:

```bash
ndlc.sh oracle generate MyOwnOracle
```

Read our documentation on our [github repository](https://github.com/dgarage/NDLC/blob/master/docs/Concepts.md).
