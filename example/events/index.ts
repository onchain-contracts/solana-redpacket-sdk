import dotenv from "dotenv";
import { Connection, Keypair } from "@solana/web3.js";
import { RedPacketSDK } from "../../src/index.js";
import { AnchorProvider, Wallet } from "@coral-xyz/anchor";

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

  let connection = new Connection(process.env.HELIUS_RPC_URL || "");

  let wallet = new Wallet(new Keypair()); //note this is not used
  const provider = new AnchorProvider(connection, wallet, {
    commitment: "finalized",
  });

  const sdk = new RedPacketSDK(provider);

  const createEvent = sdk.addEventListener("createEvent", (event) => {
    console.log("createEvent", event);
  });
  console.log("createEvent", createEvent);

  const claimEvent = sdk.addEventListener("claimEvent", (event) => {
    console.log("claimEvent", event);
  });
  console.log("claimEvent", claimEvent);

  const completeEvent = sdk.addEventListener("completeEvent", (event) => {
    console.log("completeEvent", event);
  });
  console.log("completeEvent", completeEvent);
};

main();