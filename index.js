const OPTION_TYPES = {
  CALL: 'C',
  PUT: 'P'
}

/**
 * Calculates the strike that inflicts maximum pain for option buyers
 * @param {Array} optionChain Array of objects
 * Each object needs to be of the following format
 * {
 *   strikePrice // The strike price
 *   C: {
 *     openInterest // The open interest for the Call option
 *   }
 *   P: {
 *     openInterest // The open interest for the Put option
 *   }
 * }
 * Presence of other attributes are fine but the above
 * are needed at a minimum
 */
function calculate (optionChain) {
  /**
   * Theory / Formula - https://zerodha.com/varsity/chapter/max-pain-pcr-ratio/
   */
  const strikes = []
  const chain = {}

  // Minimum pain for option writers, max pain for option buyers
  let minPain
  let minPainStrike

  optionChain.forEach(option => {
    const { strikePrice } = option

    // Collect all strikes
    strikes.push(strikePrice)

    // Format data for easier and quicker read
    chain[strikePrice] = {}
    chain[strikePrice][OPTION_TYPES.CALL] = option[OPTION_TYPES.CALL]
    chain[strikePrice][OPTION_TYPES.PUT] = option[OPTION_TYPES.PUT]
  })

  // Lowest strike first
  strikes.sort((a, b) => a - b)

  strikes.forEach(outerStrike => {
    const spotExpiry = outerStrike
    let totalLoss = 0

    strikes.forEach(innerStrike => {
      if (spotExpiry < innerStrike) {
        // Only PUT option writers would lose money
        const intrinsicValue = innerStrike - spotExpiry
        totalLoss += chain[innerStrike][OPTION_TYPES.PUT].openInterest * intrinsicValue
      } else if (spotExpiry > innerStrike) {
        // Only CALL option writers would lose money
        const intrinsicValue = spotExpiry - innerStrike
        totalLoss += chain[innerStrike][OPTION_TYPES.CALL].openInterest * intrinsicValue
      }
    })

    if (!minPain) {
      minPain = totalLoss
      minPainStrike = spotExpiry
    } else if (totalLoss < minPain) {
      minPain = totalLoss
      minPainStrike = spotExpiry
    }
  })

  return minPainStrike
}

module.exports = { calculate }
