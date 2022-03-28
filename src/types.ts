import {
  StartedTestContainer
} from "testcontainers";

export type SignedTransactionData = Uint8Array | Uint8Array[];

export type ASCStorageSchema = {
  numLocalInts: number,
  numGlobalByteSlices: number,
  numGlobalInts: number,
  numLocalByteSlices: number
}

export type ASCParams = {
  [key: string]: string | number
}

export type Container = StartedTestContainer;

export type KmdWallet = {
  driver_name: string,
  driver_version: number,
  id: string,
  mnemonic_ux: boolean,
  name: string,
  supported_txs: string[]
}

export type NetworkAccount = {
  name: string,
  address: string,
  mnemonic: string
}

export type AccountAsset = {
  amount: number,
  "asset-id": number,
  "is-frozen": boolean
}