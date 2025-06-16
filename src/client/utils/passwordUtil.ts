
import { PasswordAPIResponse } from "../pages/PlayPage"

const PASSWORDS: PasswordAPIResponse[] = [
  {
    hints: [
      "Start with the two letters on Granny's ID card.",
      "Include three 5",
      `Write ${Math.floor(Math.random() * 30) + 1} in Roman numerals.`,
      "Slip in today's Wordle answer.",
      "The sum of digits add up to 69.",
      "Add Granny's ex's name",
      "Toss in exactly one \"!\".",
      "Include the current hour (1-12).",
      "Finish with \"DD\"."
    ],
    verifyFuntion: "checkWordlePassword"
  }
]


export default function getRandomPassword() {
  return {
    info: PASSWORDS[0]
  }
  // TODO: remove the above and uncomment below in prod
  // return { info: PASSWORDS[randIndex(0, PASSWORDS.length - 1)] }
}

