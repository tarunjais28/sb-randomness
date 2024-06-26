import * as web3 from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import { AnchorProvider } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import sbRandomnessIDL from "../target/idl/sb_randomness.json";
import { SB_RANDOMNESS_PROGRAM_ID } from "./constant";
import * as fs from "fs";

export const sbRandomnessProgramID = new PublicKey(SB_RANDOMNESS_PROGRAM_ID);

export const sbRandomnessProgramInterface = JSON.parse(
  JSON.stringify(sbRandomnessIDL)
);

const solanaNetwork = web3.clusterApiUrl("devnet");
const opts: any = {
  preflightCommitment: "processed",
};

export const getProvider = (): {
  provider: AnchorProvider;
  connection: web3.Connection;
} => {
  try {
    //Creating a provider, the provider is authenication connection to solana
    const connection = new web3.Connection(
      solanaNetwork,
      opts.preflightCommitment
    );

    /// With config file
    const rawPayerKeypair = JSON.parse(
      fs.readFileSync("/Users/tarunjaiswal/.config/solana/id.json", "utf-8")
    );
    const privateKeyWallet = anchor.web3.Keypair.fromSecretKey(
      Buffer.from(rawPayerKeypair)
    );

    const provider: any = new AnchorProvider(
      connection,
      new NodeWallet(privateKeyWallet),
      opts
    );
    return { provider, connection };
  } catch (error) {
    console.log("provider:solana", error);
    throw error;
  }
};
