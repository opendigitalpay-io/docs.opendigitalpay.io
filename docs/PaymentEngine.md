# OpenDigitalPay Payment Engine

In this section, we will cover the design of core payment engine.

The payment engine contains two services:
* open-balance
* open-pay

## open-balance

Open-balance servers the fundation of the whole payment system. It manages the balance accounts of users and merchants. And it also has a ledger component to keep track all money movements between accounts.

The key functions are:
* create user/merchant balance accounts
* get account list
* top up money to balance account
* pay using balance account

pls refer here for API docs

## open-pay

On top of open-balance service, Open-pay interacts with third party financial instructions (e.g. banks, stripe) to process the payment transactions seen by users. 

The following diagram descibe the interactions between open-pay, open-balance and third party financial instructions.

The key functions provides by open-pays are:
* Topup money from bank account to user's balance account
* pay (using balance account or credit card)
* refund
* payout to merchant
* etc.

pls refer here for API docs.