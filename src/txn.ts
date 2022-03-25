import {
  Algodv2,
  waitForConfirmation
} from "algosdk";

import {
  SignedTransactionData
} from "./types";
import client from "./client";

export async function sendTxn(algodClient: Algodv2, signedTxn: SignedTransactionData) {
  const pendingTxn = await algodClient.sendRawTransaction(signedTxn).do();

  const confirmedTxn = await waitForConfirmation(algodClient, pendingTxn.txId, 4);

  return confirmedTxn;
}

export async function getSuggestedParams() {
  return await client().getTransactionParams().do();
}