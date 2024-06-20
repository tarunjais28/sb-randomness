import * as anchor from "@coral-xyz/anchor";
import { sbRandomnessProgramInterface, getProvider } from "./solanaService";
import { SbRandomness } from "../target/types/sb_randomness";
import { Program } from "@coral-xyz/anchor";
import { AdminAddress, RANDOM } from "./constant";
import {
  Queue,
  Randomness,
  SB_ON_DEMAND_PID,
  sleep,
} from "@switchboard-xyz/on-demand";
import { PublicKey, Transaction, Keypair } from "@solana/web3.js";
import * as fs from "fs";

const { provider }: any = getProvider();
if (!provider) throw new Error("Provider not available");
let program: any = new anchor.Program(
  sbRandomnessProgramInterface,
  provider
) as Program<SbRandomness>;

const [pdaRandom] = anchor.web3.PublicKey.findProgramAddressSync(
  [RANDOM],
  program.programId
);

const init = async () => {
  await program.methods
    .initialize()
    .accounts({
      random: pdaRandom,
      authority: AdminAddress,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc();
};

const fetchRandomNumber = async () => {
  let random = await program.account.random.fetch(pdaRandom);
  console.log("Random number is: ", Number(random.number));
};

const generateRandomNumber = async () => {
  const rawPayerKeypair = JSON.parse(
    fs.readFileSync("/Users/tarunjaiswal/.config/solana/id.json", "utf-8")
  );
  const privateKeyWallet = anchor.web3.Keypair.fromSecretKey(
    Buffer.from(rawPayerKeypair)
  );

  // Switchboard sbQueue fixed
  const sbQueue = new PublicKey("FfD96yeXs4cxZshoPPSKhSPgVQxLAJUT3gefgh84m1Di");
  const sbProgramId = SB_ON_DEMAND_PID;
  const sbIdl = await anchor.Program.fetchIdl(sbProgramId, provider);
  const sbProgram = new anchor.Program(sbIdl!, provider);
  const queueAccount = new Queue(sbProgram, sbQueue);

  const rngKp = Keypair.generate();
  const [randomness, ix] = await Randomness.create(sbProgram, rngKp, sbQueue);

  const transaction = new Transaction();
  transaction.add(ix);
  const sig1 = await provider.sendAndConfirm(transaction, [
    privateKeyWallet,
    rngKp,
  ]);
  await provider.connection.confirmTransaction(sig1);

  const transaction1 = new Transaction();
  // Commit transaction
  let commitIx;
  try {
    commitIx = await randomness.commitIx(sbQueue);
  } catch (error) {
    try {
      await queueAccount.fetchFreshOracle();
    } catch (error) {
      console.error("Failed to find an open oracle.");
      throw error;
    }
    throw error;
  }

  transaction1.add(commitIx);
  let sig = await provider.sendAndConfirm(transaction1, [privateKeyWallet]);
  console.log(
    `Click here to redierct solana explorer for account creation: https://explorer.solana.com/tx/${sig}?cluster=devnet`
  );

  let generate = await program.methods
    .generate()
    .accounts({
      random: pdaRandom,
      randomnessAccountData: randomness.pubkey,
    })
    .instruction();

  const transaction2 = new Transaction();
  let revealIx = undefined;
  const tries = 5;
  for (let i = 0; i < tries; ++i) {
    try {
      revealIx = await randomness.revealIx();
      break;
    } catch (error) {
      if (i === tries - 1) {
        throw error;
      }
      await sleep(1000);
    }
  }

  transaction2.add(revealIx!, generate);
  sig = await provider.sendAndConfirm(transaction2, [privateKeyWallet], {
    commitment: "confirmed",
  });

  console.log(
    `Click here to redierct solana explorer for random number: https://explorer.solana.com/tx/${sig}?cluster=devnet`
  );
  await fetchRandomNumber();
};

export { init, fetchRandomNumber, generateRandomNumber };
