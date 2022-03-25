import fs from "fs";
import {
  generateAccount,
  Account,
  makePaymentTxnWithSuggestedParamsFromObject,
  algosToMicroalgos,
  mnemonicToSecretKey
} from "algosdk";

import {
  sandboxAccount,
  sendTxn,
  NetworkAccount
} from ".";
import client from "./client";

export async function createAccounts(n: number) {
  const accounts = [];
  for (let i = 0; i < n; i++) {
    accounts.push(generateAccount());
  }
  return accounts;
}

export async function fundAccounts(accounts: Account[], amount: number) {
  for (const account of accounts) {
    await fundAccount(account.addr, amount);
  }
}

export async function fundAccount(address: string, amount: number) {
  const transactionParams = await client().getTransactionParams().do();
  const unsignedTxn = makePaymentTxnWithSuggestedParamsFromObject({
    suggestedParams: transactionParams,
    to: address,
    from: sandboxAccount().addr,
    amount: algosToMicroalgos(amount)
  });

  const signedTxn = unsignedTxn.signTxn(sandboxAccount().sk);

  const confirmedTxn = await sendTxn(client(), signedTxn);

  return confirmedTxn;
}

export function getAccount(name: string) {
  const accountsDir = `${process.cwd()}/assets/accounts`;
  const network = process.env.NETWORK;

  if (network) {
    const rawAccounts = fs.readFileSync(`${accountsDir}/${network}.json`);
    const accounts: NetworkAccount[] = JSON.parse(rawAccounts.toString());
    const account = accounts.find(a => a.name === name);
    if (account) {
      return mnemonicToSecretKey(account?.mnemonic);
    } else {
      throw new Error(`Account ${name} doesn't exist in ${network}.json`);
    }
    
  } else {
    throw new Error("NETWORK must be set in environment");
  }
}