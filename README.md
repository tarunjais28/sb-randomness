# sb-randomness
Random Number Generation with Switchboard

## Steps to run
1. Update keypair file path for `rawPayerKeypair` variable present at `scripts/solanaService.ts` and `scripts/random.ts`.
2. Update `AdminAddress` of file `scripts/constant.ts` with the your public key 
3. Run `npm i`
4. Uncomment function `randomProgram.fetchRandomNumber()` on `scripts/index.ts` file and run `npm run start` to get last fetched random number 
5. Uncomment function `randomProgram.generateRandomNumber()` on `scripts/index.ts` file  and run `npm run start` to get new random number

### Notes
No need to run `randomProgram.init()` from `scripts/index.ts` as contract is already deployed to Devnet.

## Program Id
```
GHg2C6QNyeSogbQXfuqMCFuRSFEFxNUWpfVbehqnZjy2
```
