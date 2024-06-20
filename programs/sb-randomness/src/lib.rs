use anchor_lang::prelude::*;
use switchboard_on_demand::accounts::RandomnessAccountData;
use crate::{constants::*, events::*, instructions::*, states::*};

mod constants;
mod errors;
mod events;
mod instructions;
mod states;

declare_id!("GHg2C6QNyeSogbQXfuqMCFuRSFEFxNUWpfVbehqnZjy2");

#[program]
pub mod sb_randomness {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        instructions::init(ctx)
    }

    pub fn generate(ctx: Context<GenerateWithSwitchBoard>) -> Result<u64> {
        instructions::process_generate_and_store(ctx)
    }
}
