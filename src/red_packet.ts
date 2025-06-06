import { BN } from "bn.js";
import { Program, Provider } from "@coral-xyz/anchor";
import { createAssociatedTokenAccountInstruction, getAccount, getAssociatedTokenAddress, NATIVE_MINT } from "@solana/spl-token";
import { Commitment, Connection, Finality, Keypair, PublicKey, TransactionInstruction } from "@solana/web3.js";
import { DEFAULT_COMMITMENT, DEFAULT_FINALITY, sendTx } from "./util.js";
import { PriorityFee } from "./types.js";
import { RedPacketEventHandlers, RedPacketEventType, toCompleteEvent, toCreateEvent, toSetGlobalCfgEvent, toClaimEvent, toWithdrawEvent } from "./events.js";
import { RedPacketProgram, IDL } from "./IDL/index.js";



export const GLOBAL_ACCOUNT_SEED = "global";
export const RED_PACKET_SEED = "red-packet";
export const DEFAULT_DECIMALS = 6;


export class RedPacketSDK {
    public program: Program<RedPacketProgram>;
    public connection: Connection;
    
    constructor(provider?: Provider) {
        this.program = new Program<RedPacketProgram>(IDL as RedPacketProgram, provider);
        this.connection = this.program.provider.connection;
    }

    async create(
        id: PublicKey,
        creator: Keypair,
        mint: PublicKey,
        maxClaims,
        totalAmount?: bigint,
        fixedAmount?: bigint,
        memo?: string,
        password?: string,
        claimAuthority?: PublicKey,
        priorityFees?: PriorityFee,
        commitment: Commitment = DEFAULT_COMMITMENT,
        finality: Finality = DEFAULT_FINALITY,
    ) {
        const globalAccount = await this.getGlobalAccount(commitment);

        const instructions = await this.getCreateInstructions(
            id,
            creator.publicKey,
            mint,
            maxClaims,
            globalAccount.feeRecipient,
            totalAmount,
            fixedAmount,
            memo,
            password,
            claimAuthority,
        );

        return await sendTx(
            this.connection,
            instructions,
            creator.publicKey,
            [creator],
            priorityFees,
            commitment,
            finality,
        );
    }

    async getCreateInstructions(
        id: PublicKey,
        creator: PublicKey,
        mint: PublicKey,
        maxClaims: number,
        feeRecipient: PublicKey,
        totalAmount?: bigint,
        fixedAmount?: bigint,
        memo?: string,
        password?: string,
        claimAuthority?: PublicKey,
    ) {
        if (mint.equals(NATIVE_MINT)) {            
            const createIx = await this.program.methods
                .create({ 
                    id,
                    totalAmount: totalAmount ? new BN(totalAmount.toString()) : null,
                    fixedAmount: fixedAmount ? new BN(fixedAmount.toString()) : null,
                    maxClaims: maxClaims,
                    memo: memo ?? null,
                    password: password ?? null,
                    claimAuthority: claimAuthority ?? null,
                })
                .accounts({
                    program: this.program.programId,
                    creator,
                    feeRecipient,
                    mint,
                    creatorTokenAccount: null,
                }).instruction();

            return [createIx];
        } else {    
            const creatorTokenAccount = await getAssociatedTokenAddress(mint, creator, false);

            const createIx = await this.program.methods
                .create({ 
                    id,
                    totalAmount: totalAmount ? new BN(totalAmount.toString()) : null, 
                    fixedAmount: fixedAmount ? new BN(fixedAmount.toString()) : null,
                    maxClaims: maxClaims,
                    memo: memo ?? null,
                    password: password ?? null,
                    claimAuthority: claimAuthority ?? null,
                })
                .accounts({
                    program: this.program.programId,
                    mint,
                    creator,
                    feeRecipient,
                    creatorTokenAccount,
                }).instruction();

            return [createIx];
        }
    }

    async claim(
        id: PublicKey, 
        claimer: Keypair,
        password?: string,
        claimAuthority?: Keypair, 
        priorityFees?: PriorityFee,
        commitment: Commitment = DEFAULT_COMMITMENT,
        finality: Finality = DEFAULT_FINALITY,
    ) {
        const instructions = await this.getClaimInstructions(
            id,
            claimer.publicKey,
            password,
            claimAuthority?.publicKey,
            commitment,
        );

        const signers = [claimer];
        if (!!claimAuthority) {
            signers.push(claimAuthority);
        }


        return await sendTx(
            this.connection,
            instructions,
            claimer.publicKey,
            signers,
            priorityFees,
            commitment,
            finality,
        );
    }

    async getClaimInstructions(
        id: PublicKey,
        claimer: PublicKey,
        password?: string,
        claimAuthority?: PublicKey,
        commitment: Commitment = DEFAULT_COMMITMENT,
    ) {
        const redPacket = await this.getRedPacketAccount(id, commitment);

        if (redPacket.mint.equals(NATIVE_MINT)) {
            return [
                await this.program.methods.claim({
                    id,
                    password: password ?? null,
                 }).accounts({
                    claimer,
                    mint: redPacket.mint,
                    // @ts-ignore
                    claimAuthority: claimAuthority ?? null,
                    claimerTokenAccount: null,
                    redPacketTokenAccount: null,
                }).instruction(),
            ];
        } else {
            const redPacketTokenAccount = await getAssociatedTokenAddress(redPacket.mint, this.getRedPacketPDA(id), true);

            const instructions: TransactionInstruction[] = [];

            const claimerTokenAccount = await getAssociatedTokenAddress(redPacket.mint, claimer, false);
        
            try {
                await getAccount(this.connection, claimerTokenAccount, commitment);
            } catch (e) {
                // console.log('catch createAssociatedTokenAccountInstruction: ', e);
                instructions.push(
                    createAssociatedTokenAccountInstruction(
                        claimer,
                        claimerTokenAccount,
                        claimer,
                        redPacket.mint,
                    )
                );
            }

            instructions.push(
                await this.program.methods.claim({
                    id,
                    password: password ?? null,
                 }).accounts({
                    claimer,
                    mint: redPacket.mint,
                    // @ts-ignore
                    claimAuthority: claimAuthority ?? null,
                    claimerTokenAccount,
                    redPacketTokenAccount,
                }).instruction(),
            );
    
            return instructions;
        }
    }

    async setRedPacket(
        id: PublicKey, 
        user: Keypair,
        claimAuthority?: PublicKey, 
        password?: string,
        priorityFees?: PriorityFee,
        commitment: Commitment = DEFAULT_COMMITMENT,
        finality: Finality = DEFAULT_FINALITY,
    ) {
       const instructions = await this.getSetRedPacketInstructions(
            id,
            user.publicKey,
            claimAuthority,
            password,
       );

        return await sendTx(
            this.connection,
            instructions,
            user.publicKey,
            [user],
            priorityFees,
            commitment,
            finality,
        );
    }

    async getSetRedPacketInstructions(
        id: PublicKey, 
        user: PublicKey,
        claimAuthority?: PublicKey,
        password?: string,
    ) {
        const setRedPacketIx = await this.program.methods.setRedPacket({
            id,
            claimAuthority: claimAuthority ?? null,
            password: password ?? null,
        }).accounts({
            user,
        }).instruction();
    
        return [setRedPacketIx];
    }

    async getGlobalAccount(commitment: Commitment = DEFAULT_COMMITMENT) {
        const [globalAccountPDA] = PublicKey.findProgramAddressSync(
            [Buffer.from(GLOBAL_ACCOUNT_SEED)],
            this.program.programId
        );

        return await this.program.account.global.fetch(globalAccountPDA, commitment);
    }

    async withdraw(
        id: PublicKey,
        user: Keypair,
        priorityFees?: PriorityFee,
        commitment: Commitment = DEFAULT_COMMITMENT,
        finality: Finality = DEFAULT_FINALITY,
    ) {
        const redPacket = await this.getRedPacketAccount(id, commitment);
        if (!redPacket) {
            throw new Error("Red packet not found");
        }
        
        const instructions = await this.getWithdrawInstructions(
            id,
            user.publicKey,
            redPacket.mint,
            redPacket.creator,
        );
        
        return await sendTx(
            this.connection,
            instructions,
            user.publicKey,
            [user],
            priorityFees,
            commitment,
            finality,
        );
    }

    async getWithdrawInstructions(
        id: PublicKey,
        user: PublicKey,
        mint: PublicKey,
        creator: PublicKey,
    ) {
        return [
            await this.program.methods.withdraw({
                id,
            })
            .accounts({
                program: this.program.programId,
                user,
                mint,
                creator,
            }).instruction()
        ];
    }

    getRedPacketPDA(id: PublicKey) {
        return PublicKey.findProgramAddressSync(
            [Buffer.from("red-packet"), id.toBuffer()],
            this.program.programId
        )[0];
    }

    async getRedPacketAccount(
        id: PublicKey,
        commitment: Commitment = DEFAULT_COMMITMENT,
    ) {
        return await this.program.account.redPacket.fetch(
            this.getRedPacketPDA(id),
            commitment
        );
    }

    // events
    addEventListener<T extends RedPacketEventType>(
        eventType: T, 
        callback: (
            event: RedPacketEventHandlers[T],
            slot: number,
            signature: string,
        ) => void
    ) {
        return this.program.addEventListener(
            eventType,
            (event: any, slot: number, signature: string) => {                
                let processedEvent;
                switch (eventType) {
                    case "createEvent":
                        processedEvent = toCreateEvent(event);
                        callback(
                            processedEvent,
                            slot,
                            signature,
                        );
                        break;
                    case "claimEvent":
                        processedEvent = toClaimEvent(event);
                        callback(
                            processedEvent,
                            slot,
                            signature,
                        );
                        break;
                    case "completeEvent":
                        processedEvent = toCompleteEvent(event);
                        callback(
                            processedEvent,
                            slot,
                            signature,
                        );
                        break;
                    case "withdrawEvent":
                        processedEvent = toWithdrawEvent(event);
                        callback(
                            processedEvent,
                            slot,
                            signature,
                        );
                        break;
                    case "setGlobalCfgEvent":
                        processedEvent = toSetGlobalCfgEvent(event);
                        callback(
                            processedEvent,
                            slot,
                            signature,
                        );
                        break;
                    default:
                        console.error(`Unhandled event type: ${eventType}`);
                        break;
                }                
            }
        );
    }

    removeEventListener(eventId: number) {
        this.program.removeEventListener(eventId);
    }
}