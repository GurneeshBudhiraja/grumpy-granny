import { randomInt } from 'crypto'

const PASSWORDS = [
  {
    hints: [
      "Start with the two letters on Grannyss ID card.",
      "Include three 5",
      `Write ${Math.floor(Math.random() * 30) + 1} in Roman numerals.`,
      "Slip in today's Wordle answer.",
      "The sum of digits add up to 69.",
      "Add Granny's ex's name from document",
      "Toss in exactly one “!”.",
      "Include the current hour (1-12).",
      "Finish with “DD”."
    ],
    verfiyFunction: "checkWordlePassword"
  }
]


let _lastIndex = -1

/**
 * Returns a cryptographically-secure integer between min and max (inclusive),
 * never repeating the same value twice in a row.
 */
function randIndex(min: number, max: number): number {
  // crypto.randomInt generates [min, maxExclusive), so we pass max+1
  const rnd = randomInt(min, max + 1)
  if (rnd === _lastIndex) {
    // retry if we accidentally got the same as last time
    return randIndex(min, max)
  }
  _lastIndex = rnd
  return rnd
}


export default function getRandomPassword() {
  return {
    info: PASSWORDS[0]
  }
  // TODO: remove the above and uncomment below in prod
  // return { info: PASSWORDS[idx] }
}

