use super::*;

#[error_code]
pub enum CustomError {
    #[msg("Error either randomness is old or not revealed!")]
    SwitchboardRandomnessTooOld,

    #[msg("Error: Invalid Discriminator!")]
    InvalidDiscriminator,
}
