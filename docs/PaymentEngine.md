# OpenDigitalPay Payment Engine

In this section, we will cover the design of core payment engine.

The payment engine contains two services:
* open-balance
* open-pay

## open-balance

Open-balance servers the fundation of the whole payment system. It manages the balance accounts of users and merchants. And it also has a ledger component to keep track all money movements between accounts.

more one balance use case.

The key functions are:
* create user/merchant balance accounts
* get account list
* ...

pls refer here for API docs

## open-pay

On top of open-balance service, Open-pay interact with third party financial instructions (e.g. banks, stripe) to process the payment transactions seen by users. 

The following diagram descibe the interactions between open-pay, open-balance and third party financial instructions.

THe key functions provides by open-pays are:
* pay
* refund
* payout
* etc.

pls refer here for API docs.

Sequence diagrmas?
*pay using balance or credit card
*add money from bank account/creditcard