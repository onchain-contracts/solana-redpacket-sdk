import { PublicKey, VersionedTransactionResponse } from "@solana/web3.js";



export type PriorityFee = {
  unitLimit: number;
  unitPrice: number;
};


export type TransactionResult = {
  signature?: string;
  error?: unknown;
  results?: VersionedTransactionResponse;
  success: boolean;
};


export type CreateEvent = {
  id: PublicKey;
  redPacket: PublicKey;
  mint: PublicKey;
  maxClaims: number;
  totalAmount: bigint;
  memo: string;
  creator: PublicKey;
  claimAuthority?: PublicKey;
  timestamp: number;
};

export type CompleteEvent = {
  id: PublicKey;
  redPacket: PublicKey;
  claimer: PublicKey;
  mint: PublicKey;
  timestamp: number;
};

export type ClaimEvent = {
  id: PublicKey;
  redPacket: PublicKey;
  mint: PublicKey;
  amount: bigint;
  claimer: PublicKey;
  totalAmount: bigint;
  timestamp: number;
};

export type WithdrawEvent = {
  id: PublicKey;
  redPacket: PublicKey;
  mint: PublicKey;
  amount: bigint;
  timestamp: number;
};

export type SetGlobalCfgEvent = {
  feeRecipient: PublicKey;
  createFee: bigint;  
  initialMaxTotalAmount: bigint;
  initialMaxClaims: number;
  initialMinAmountPerClaim: bigint;
  timestamp: number;
};