use errors::CustomError;

use super::*;

/// Function for generate and store random number
///
/// Emits random number event
pub fn process_generate_and_store(ctx: Context<GenerateWithSwitchBoard>) -> Result<u64> {
    let random = &mut ctx.accounts.random;

        let randomness_data =
            RandomnessAccountData::parse(ctx.accounts.randomness_account_data.data.borrow())
                .map_err(|_| CustomError::InvalidDiscriminator)?;

        let random_value = randomness_data
            .get_value(&Clock::get()?)
            .map_err(|_| CustomError::SwitchboardRandomnessTooOld)?;

        random.number = random_value[0] as u64;

        msg!("Random number is: {}", random.number);

        // Emit random number event
        emit!(RandomNumberEvent {
            value: random.number
        });

        Ok(random.number)
}

#[derive(Accounts)]
#[instruction()]
pub struct GenerateWithSwitchBoard<'info> {
    #[account(
        mut,
        seeds = [RANDOM_TAG],
        bump,
    )]
    pub random: Account<'info, Random>,

    /// CHECK: The account's data is validated manually within the handler.
    pub randomness_account_data: AccountInfo<'info>,
}
