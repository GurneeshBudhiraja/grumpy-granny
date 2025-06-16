import { PasswordAPIResponse } from "../pages/PlayPage"

const PASSWORDS: PasswordAPIResponse[] = [
  {
    hints: [
      "Start with the two letters on Granny's ID card.",
      "Include three 5s",
      "Write 17 in Roman numerals.",
      "The sum of digits add up to 69.",
      "Include Granny's ex's namefrom document",
      "Toss in exactly one \"!\".",
      "Include the current hour of the day (1-12).",
      "Finish with \"DD\"."
    ],
    verifyFuntion: "checkWordlePassword"
  },
  {
    hints: [
      "Start with Granny's age",
      "Include exactly three “7” characters.",
      "Write 12 in Roman numerals.",
      "Make all digits sum to 60.",
      "Include the Granny's birth date",
      "Use one and only one tilde “~”.",
      "Append today's day of the month (1-31).",
      "Finish with “!!”."
    ],
    verifyFuntion: "checkGrannyAgePassword"
  },
]


let _lastIndex = -1
function randIndex(min: number, max: number): number {
  const range = max - min + 1
  const byteLength = Math.ceil(Math.log2(range) / 8)
  const maxValue = Math.pow(256, byteLength)
  const maxRange = maxValue - (maxValue % range)

  let rnd
  do {
    const bytes = new Uint8Array(byteLength)
    crypto.getRandomValues(bytes)
    let value = 0
    for (let i = 0; i < bytes.length; i++) {
      value = (value << 8) + bytes[i]!
    }
    if (value < maxRange) {
      rnd = min + (value % range)
    }
  } while (rnd === undefined || rnd === _lastIndex)

  _lastIndex = rnd
  return rnd
}


export default function getRandomPassword() {
  return { info: PASSWORDS[randIndex(0, PASSWORDS.length - 1)] }
}