import {
  mnemonicToSecretKey,
  Account
} from "algosdk";

export function sandboxAccount(): Account {
  const sandboxMnemonic = process.env["SANDBOX_MNEMONIC"];
  if (sandboxMnemonic) {
    return mnemonicToSecretKey(sandboxMnemonic);
  } else {
    throw new Error("SANDBOX_MNEMONIC not set in environment");
  }
  
}