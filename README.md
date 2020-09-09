# Max Pain

Calculate the max pain for an option chain

## Installation

You can install this module through `npm`:

```bash
npm install @dalal-street/max-pain
```

## Usage

An example of how you can use this module:

```javascript
const maxPain = require('@dalal-street/max-pain')

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

maxPain.calculate(optionChain)
// => 7800
// This is the strike at which we can say there is max pain for option buyers
```
