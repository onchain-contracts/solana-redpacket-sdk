# Solana RedPacket SDK

## Important

Never click links in this repository leaving github, never click links in Issues, don't run code that others post without reading it, this software is provided "as is," without warranty.

## Overview

The `RedPacketSDK` is designed to interact with the RedPacket.io decentralized application. It provides methods for creating, claim red packet using the Solana blockchain. The SDK handles the necessary transactions and interactions with the redpacket.io program.

## Installation

`
npm i solana-redpacket-sdk
`

## Usage Example

First you need to create a `.env` file and set your RPC URL like in the `.env.example`

Then you need to fund an account with atleast 0.004 SOL that is generated when running the command below

`
npx ts-node example/basic/index.ts
`

```typescript
import dotenv from "dotenv";
import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { DEFAULT_DECIMALS, RedPacketSDK } from "solana-redpacket-sdk";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { AnchorProvider } from "@coral-xyz/anchor";
import {
  getOrCreateKeypair,
  getSPLBalance,
  printSOLBalance,
  printSPLBalance,
} from "./util";

dotenv.config();

const KEYS_FOLDER = __dirname + "/.keys";

const getProvider = () => {
  if (!process.env.HELIUS_RPC_URL) {
    throw new Error("Please set HELIUS_RPC_URL in .env file");
  }

  const connection = new Connection(process.env.HELIUS_RPC_URL || "");
  const wallet = new NodeWallet(new Keypair());
  return new AnchorProvider(connection, wallet, { commitment: "finalized" });
};

const create = async (sdk, testAccount, mint) => {
  const createResults = await sdk.create(
    id,
    testAccount,
    mint,
    3,
    BigInt(0.001 * LAMPORTS_PER_SOL),
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

    if (mint == NATIVE_MINT) {
      printSOLBalance(connection, testAccount.publicKey);
    } else {
      printSPLBalance(connection, mint, testAccount.publicKey);
    }
  } else {
    console.log("Create failed");
  }
};

const claim = async (sdk, testAccount, id) => {
  const claimResults = await sdk.claim(
    id,
    testAccount,
    null,
    {
      unitLimit: 250000,
      unitPrice: 250000,
    }
  );

  if (claimResults.success) {
    console.log("RedPacket after claim", await sdk.getRedPacketAccount(id));
  } else {
    console.log("Claim failed");
  }
};

const withdraw = async (sdk, testAccount, id) => {
  const withdrawResults = await sdk.withdraw(
    id,
    testAccount,
    null,
    {
      unitLimit: 250000,
      unitPrice: 250000,
    }
  );

  if (claimResults.success) {
    console.log("RedPacket after withdraw", await sdk.getRedPacketAccount(id));
  } else {
    console.log("Withdraw failed");
  }
};

const main = async () => {
  try {
    const provider = getProvider();
    const sdk = new RedPacketSDK(provider);
    const connection = provider.connection;

    const testAccount = getOrCreateKeypair(KEYS_FOLDER, "test-account");
    const mint = getOrCreateKeypair(KEYS_FOLDER, "mint");

    await printSOLBalance(connection, testAccount.publicKey, "Test Account keypair");

    const globalAccount = await sdk.getGlobalAccount();
    console.log(globalAccount);

    const currentSolBalance = await connection.getBalance(testAccount.publicKey);
    if (currentSolBalance === 0) {
      console.log("Please send some SOL to the test-account:", testAccount.publicKey.toBase58());
      return;
    }

    console.log(await sdk.getGlobalAccount());

    let redPacketAccount = await sdk.getRedPacketAccount(id);
    if (!redPacketAccount) {
      await create(sdk, testAccount, mint);
      redPacketAccount = await sdk.getRedPacketAccount(id);
    }

    if (redPacketAccount) {
      await claim(sdk, testAccount, id);
    }

    await withdraw(sdk, testAccount, id);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

main();
```


### RedPacketSDK Class

The `RedPacketSDK` class provides methods to interact with the RedPacket protocol. Below are the method signatures and their descriptions.


#### create

```typescript
async create(
  id: PublicKey,
  creator: Keypair,
  mint: Keypair,
  maxRecipients: number,
  totalAmount?: bigint,
  fixedAmount?: bigint,
  claimAuthority?: PublicKey,
  password?: String,
  priorityFees?: PriorityFee,
  commitment: Commitment = DEFAULT_COMMITMENT,
  finality: Finality = DEFAULT_FINALITY
): Promise<TransactionResult>
```

- Creates a new redpacket.
- **Parameters**:
  - `id`: id.
  - `creator`: The keypair of the token creator.
  - `mint`: The keypair of the mint account.
  - `maxRecipients`: Max recipients (optional).
  - `totalAmount`: Total amount (optional).
  - `fixedAmount`: Fixed amount (optional).
  - `claimAuthority`: Claim Authority (optional).
  - `password`: Password (optional).
  - `priorityFees`: Priority fees (optional).
  - `commitment`: Commitment level (default: DEFAULT_COMMITMENT).
  - `finality`: Finality level (default: DEFAULT_FINALITY).
- **Returns**: A promise that resolves to a `TransactionResult`.

#### claim

```typescript
async claim(
  id: PublicKey,
  recipient: Keypair,
  claimAuthority?: Keypair,
  password?: string,
  priorityFees?: PriorityFee,
  commitment: Commitment = DEFAULT_COMMITMENT,
  finality: Finality = DEFAULT_FINALITY
): Promise<TransactionResult>
```

- claim a specified redpacket.
- **Parameters**:
  - `id`: The id of the redpacket.
  - `recipient`: The keypair of the recipient.
  - `claimAuthority`: Claim Authority (optional).
  - `password`: Password (optional).
  - `priorityFees`: Priority fees (optional).
  - `commitment`: Commitment level (default: DEFAULT_COMMITMENT).
  - `finality`: Finality level (default: DEFAULT_FINALITY).
- **Returns**: A promise that resolves to a `TransactionResult`.

#### sell

```typescript
async sell(
  seller: Keypair,
  mint: PublicKey,
  sellTokenAmount: bigint,
  slippageBasisPoints: bigint = 500n,
  priorityFees?: PriorityFee,
  commitment: Commitment = DEFAULT_COMMITMENT,
  finality: Finality = DEFAULT_FINALITY
): Promise<TransactionResult>
```

- Sells a specified amount of tokens.
- **Parameters**:
  - `seller`: The keypair of the seller.
  - `mint`: The public key of the mint account.
  - `sellTokenAmount`: Amount of tokens to sell.
  - `slippageBasisPoints`: Slippage in basis points (default: 500).
  - `priorityFees`: Priority fees (optional).
  - `commitment`: Commitment level (default: DEFAULT_COMMITMENT).
  - `finality`: Finality level (default: DEFAULT_FINALITY).
- **Returns**: A promise that resolves to a `TransactionResult`.

#### addEventListener

```typescript
addEventListener<T extends RedPacketEventType>(
  eventType: T,
  callback: (event: RedPacketEventHandlers[T], slot: number, signature: string) => void
): number
```

- Adds an event listener for the specified event type.
- **Parameters**:
  - `eventType`: The type of event to listen for.
  - `callback`: The callback function to execute when the event occurs.
- **Returns**: An identifier for the event listener.

#### removeEventListener

```typescript
removeEventListener(eventId: number): void
```

- Removes the event listener with the specified identifier.
- **Parameters**:
  - `eventId`: The identifier of the event listener to remove.

### Running the Examples

#### Basic Example

To run the basic example for creating, claim, withdraw redpacket, use the following command:

```bash
npx ts-node example/basic/index.ts
```

#### Event Subscription Example

This example demonstrates how to set up event subscriptions using the RedPacket SDK.

#### Script: `example/events/events.ts`

```typescript
import dotenv from "dotenv";
import { Connection, Keypair } from "@solana/web3.js";
import { RedPacketSDK } from "solana-redpacket-sdk";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { AnchorProvider } from "@coral-xyz/anchor";

dotenv.config();

const getProvider = () => {
  if (!process.env.HELIUS_RPC_URL) {
    throw new Error("Please set HELIUS_RPC_URL in .env file");
  }

  const connection = new Connection(process.env.HELIUS_RPC_URL || "");
  const wallet = new NodeWallet(new Keypair());
  return new AnchorProvider(connection, wallet, { commitment: "finalized" });
};

const setupEventListeners = async (sdk) => {
  const createEventId = sdk.addEventListener("createEvent", (event, slot, signature) => {
    console.log("createEvent", event, slot, signature);
  });
  console.log("Subscribed to createEvent with ID:", createEventId);

  const claimEventId = sdk.addEventListener("claimEvent", (event, slot, signature) => {
    console.log("claimEvent", event, slot, signature);
  });
  console.log("Subscribed to claimEvent with ID:", claimEventId);

  const completeEventId = sdk.addEventListener("completeEvent", (event, slot, signature) => {
    console.log("completeEvent", event, slot, signature);
  });
  console.log("Subscribed to completeEvent with ID:", completeEventId);
};

const main = async () => {
  try {
    const provider = getProvider();
    const sdk = new RedPacketSDK(provider);

    // Set up event listeners
    await setupEventListeners(sdk);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

main();
```

#### Running the Event Subscription Example

To run the event subscription example, use the following command:

```bash
npx ts-node example/events/events.ts
```

## Contributing

We welcome contributions! Please submit a pull request or open an issue to discuss any changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Here is a sample "Use at Your Own Risk" disclaimer for a GitHub repository:

---

## Disclaimer

This software is provided "as is," without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software.

**Use at your own risk.** The authors take no responsibility for any harm or damage caused by the use of this software. Users are responsible for ensuring the suitability and safety of this software for their specific use cases.

By using this software, you acknowledge that you have read, understood, and agree to this disclaimer.

---

Feel free to customize it further to suit the specific context and requirements of your project.

---

By following this README, you should be able to install the RedPacket SDK, run the provided examples, and understand how to set up event listeners and perform token operations.