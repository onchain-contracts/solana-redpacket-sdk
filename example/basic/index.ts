import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { RedPacketSDK } from "../../src/index.js";
import { AnchorProvider, Wallet } from "@coral-xyz/anchor";
import {
  getOrCreateKeypair,
  getSPLBalance,
  printSOLBalance,
  printSPLBalance,
} from "../util.js";
import { NATIVE_MINT } from "@solana/spl-token";

const KEYS_FOLDER = path.join(import.meta.dirname, ".keys");

//create token example:
//https://solscan.io/tx/bok9NgPeoJPtYQHoDqJZyRDmY88tHbPcAk1CJJsKV3XEhHpaTZhUCG3mA9EQNXcaUfNSgfPkuVbEsKMp6H7D9NY
//devnet faucet
//https://faucet.solana.com/

const main = async () => {
  dotenv.config();

  if (!process.env.HELIUS_RPC_URL) {
    console.error("Please set HELIUS_RPC_URL in .env file");
    console.error(
      "Example: HELIUS_RPC_URL=https://mainnet.helius-rpc.com/?api-key=<your api key>"
    );
    console.error("Get one at: https://www.helius.dev");
    return;
  }

  const connection = new Connection(process.env.HELIUS_RPC_URL || "");

  const wallet = new Wallet(new Keypair()); //note this is not used
  const provider = new AnchorProvider(connection, wallet, {
    commitment: "finalized",
  });

  const testAccount = getOrCreateKeypair(KEYS_FOLDER, "id");
  const mint = NATIVE_MINT;
  const splMint = new PublicKey('4h4oUsAsC1uhf7Q1pVftXj9oCRTTKmEvsYuKWtNtTGv1');
  const id = Keypair.generate().publicKey;
  const splId = Keypair.generate().publicKey;

  await printSOLBalance(
    connection,
    testAccount.publicKey,
    "Test Account keypair"
  );

  const sdk = new RedPacketSDK(provider);

  const globalAccount = await sdk.getGlobalAccount();
  console.log(globalAccount);

  const currentSolBalance = await connection.getBalance(testAccount.publicKey);
  if (currentSolBalance == 0) {
    console.log(
      "Please send some SOL to the test-account:",
      testAccount.publicKey.toBase58()
    );
    return;
  }

  console.log(await sdk.getGlobalAccount());


  /*
  const createResults = await sdk.create(
    id,
    testAccount,
    mint,
    3,
    7n, // BigInt(0.001 * LAMPORTS_PER_SOL),
    undefined,
    'test packet',
    undefined,
    undefined,
    {
      unitLimit: 250000,
      unitPrice: 250000,
    },
  );

  if (createResults.success) {
    console.log("Success:", `https://redpacket.io/${id.toBase58()}`);
    const redPacketAccount = await sdk.getRedPacketAccount(id);
    console.log("RedPacket after create", redPacketAccount);
    printSOLBalance(connection, testAccount.publicKey);
  } else {
    throw new Error('create failed');
  }

  // claim
  const claimResults = await sdk.claim(
    id,
    testAccount,
    undefined,
    undefined,
    {
      unitLimit: 250000,
      unitPrice: 250000,
    },
  );

  if (claimResults.success) {
    printSOLBalance(connection, testAccount.publicKey);
    console.log("Red packet after claim", await sdk.getRedPacketAccount(id));
  } else {
    console.log("claim failed");
  }
  */


  // spl redpacket

  const splCreateResults = await sdk.create(
    splId,
    testAccount,
    splMint,
    3,
    7n, // BigInt(0.001 * LAMPORTS_PER_SOL),
    undefined,
    'test spl packet',
    undefined,
    undefined,
    {
      unitLimit: 250000,
      unitPrice: 250000,
    },
  );

  if (splCreateResults.success) {
    console.log("Success:", `https://redpacket.io/${splId.toBase58()}`);
    const redPacketAccount = await sdk.getRedPacketAccount(splId);
    console.log("RedPacket after create", redPacketAccount);
    printSOLBalance(connection, testAccount.publicKey);
  } else {
    throw new Error('spl create failed');
  }

  // spl claim
  const splClaimResults = await sdk.claim(
    splId,
    testAccount,
    undefined,
    undefined,
    {
      unitLimit: 250000,
      unitPrice: 250000,
    },
  );

  if (splClaimResults.success) {
    printSPLBalance(connection, splMint, testAccount.publicKey);
    console.log("(SPL) Red packet after claim", await sdk.getRedPacketAccount(splId));
  } else {
    console.log("spl claim failed");
  }
};

main();