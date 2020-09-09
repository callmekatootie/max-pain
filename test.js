const test = require('ava')
const maxPain = require('./')

test('It should return the correct max pain value', t => {
  const optionChain = [
    {
      strikePrice: 7700,
      C: {
        openInterest: 1823400
      },
      P: {
        openInterest: 5783025
      }
    },
    {
      strikePrice: 7800,
      C: {
        openInterest: 3448575
      },
      P: {
        openInterest: 4864125
      }
    },
    {
      strikePrice: 7900,
      C: {
        openInterest: 5367450
      },
      P: {
        openInterest: 2559375
      }
    }
  ]

  t.is(maxPain.calculate(optionChain), 7800)
})
