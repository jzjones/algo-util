import {
  Account,
  OnApplicationComplete,
  makeApplicationCreateTxnFromObject
} from "algosdk";

import client from "./client";
import { sendTxn } from "./txn";
import {
  ASCStorageSchema,
} from "./types";

export async function deployContract(approvalProgram: Uint8Array, clearProgram: Uint8Array, creatorAccount: Account, storageSchema: ASCStorageSchema) {
  const transactionParams = await client().getTransactionParams().do();
  const createApplicationTransaction = makeApplicationCreateTxnFromObject({
    suggestedParams: transactionParams,
    from: creatorAccount.addr,
    onComplete: OnApplicationComplete.NoOpOC,
    approvalProgram,
    clearProgram,
    ...storageSchema
  });

  const signedCreateTxn = createApplicationTransaction.signTxn(creatorAccount.sk);

  const txnResponse = await sendTxn(client(), signedCreateTxn);

  const appId = txnResponse["application-index"];

  return appId;
}