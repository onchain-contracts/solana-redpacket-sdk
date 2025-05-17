import { PublicKey } from "@solana/web3.js";

import {
  CompleteEvent,
  CreateEvent,
  SetGlobalCfgEvent,
  ClaimEvent,
  WithdrawEvent,
} from "./types";

export function toCreateEvent(event): CreateEvent {
  return {
    id: new PublicKey(event.id),
    redPacket: new PublicKey(event.redPacket),
    mint: new PublicKey(event.mint),
    totalAmount: event.totalAmount,
    memo: event.memo,
    claimAuthority: event.claimAuthority ? new PublicKey(event.claimAuthority) : undefined,
    maxRecipients: event.maxRecipients,
    creator: new PublicKey(event.creator),
    timestamp: Number(event.ts),
  };
}

export function toClaimEvent(event): ClaimEvent {
  return {
    id: new PublicKey(event.id),
    redPacket: new PublicKey(event.redPacket),
    mint: new PublicKey(event.mint),
    amount: BigInt(event.amount),
    recipient: new PublicKey(event.recipient),
    totalAmount: BigInt(event.totalAmount),
    timestamp: Number(event.timestamp),
  };
}

export function toCompleteEvent(event): CompleteEvent {
  return {
    id: new PublicKey(event.id),
    redPacket: new PublicKey(event.redPacket),
    recipient: new PublicKey(event.recipient),
    mint: new PublicKey(event.mint),
    timestamp: Number(event.timestamp),
  };
}


export function toSetGlobalCfgEvent(event): SetGlobalCfgEvent {
  return {
    feeRecipient: new PublicKey(event.feeRecipient),
    createFee: BigInt(event.createFee),
    initialMaxTotalAmount: BigInt(event.initialMaxTotalAmount),
    initialMaxRecipients: event.initialMaxRecipients,
    initialMinAmountPerRecipient: BigInt(event.initialMinAmountPerRecipient),
    timestamp: Number(event.timestamp),
  };
}

export function toWithdrawEvent(event): WithdrawEvent {
  return {
    id: new PublicKey(event.id),
    redPacket: new PublicKey(event.redPacket),
    mint: new PublicKey(event.mint),
    amount: BigInt(event.amount),
    timestamp: Number(event.timestamp),
  };
}


export interface RedPacketEventHandlers {
  createEvent: CreateEvent;
  claimEvent: ClaimEvent;
  completeEvent: CompleteEvent;
  setGlobalCfgEvent: SetGlobalCfgEvent;
  withdrawEvent: WithdrawEvent;
}

export type RedPacketEventType = keyof RedPacketEventHandlers;

