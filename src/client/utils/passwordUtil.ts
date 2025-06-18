import { PasswordAPIResponse } from "../pages/PlayPage";

const PASSWORDS: PasswordAPIResponse[] = [
  {
    hints: [
      "Start with the two letters on Granny's ID card.",
      "Include exactly three 5s (because Granny loves bingo!)",
      "Write 17 in Roman numerals (Granny's lucky number).",
      "Include Granny's ex's name from her diary.",
      "Add the current hour of the day (1-12 format).",
      "Include exactly two exclamation marks (!!).",
      "Add Granny's birth year from her quote.",
      "The sum of all digits must equal 69.",
      "Finish with \"DD\" (for Drama Queen)."
    ],
    verifyFuntion: "checkCombinedPassword"
  },
  {
    hints: [
      "Begin with Granny's age from her ID.",
      "Include exactly four 7s (Granny's favorite digit).",
      "Write 12 in Roman numerals (months she's been single).",
      "Add the ex-husband's name in lowercase.",
      "Include today's day of the month (1-31).",
      "Use exactly one tilde (~) for sass.",
      "Add Granny's initials in reverse order.",
      "All digits must sum to exactly 77.",
      "End with \"GG\" (Grumpy Granny)."
    ],
    verifyFuntion: "checkCombinedPassword"
  },
  {
    hints: [
      "Start with \"BG\" followed by Granny's age.",
      "Include exactly two 9s (her grumpiness level).",
      "Write 21 in Roman numerals (drinking age she misses).",
      "Add \"MELVIN\" in all caps (she's still mad).",
      "Include the current minute (00-59).",
      "Use exactly three question marks (???).",
      "Add the year she was born.",
      "Sum of digits should equal 88.",
      "Finish with \"XO\" (fake love)."
    ],
    verifyFuntion: "checkCombinedPassword"
  },
  {
    hints: [
      "Begin with the initials \"BG\" twice (BGBG).",
      "Include exactly five 1s (lonely years).",
      "Write 15 in Roman numerals (her patience level).",
      "Add \"melvin\" in lowercase (whispered complaints).",
      "Include current hour in 24-hour format (00-23).",
      "Use exactly one ampersand (&) for drama.",
      "Add her professional title number: 73.",
      "All digits must sum to 55.",
      "End with \"!!\" (double emphasis)."
    ],
    verifyFuntion: "checkCombinedPassword"
  },
  {
    hints: [
      "Start with Granny's birth year (1951).",
      "Include exactly three 3s (trinity of grumpiness).",
      "Write 8 in Roman numerals (infinity of complaints).",
      "Add \"MELVIN\" followed by \"GONE\".",
      "Include today's date (DD format).",
      "Use exactly two tildes (~~) for extra sass.",
      "Add her age backwards (37 instead of 73).",
      "Sum of all digits equals 99.",
      "Finish with \"ZZ\" (she's tired of everything)."
    ],
    verifyFuntion: "checkCombinedPassword"
  }
];

function getRandomIndex(min: number, max: number): number {
  const range = max - min + 1;
  const byteLength = Math.ceil(Math.log2(range) / 8);
  const maxValue = Math.pow(256, byteLength);
  const maxRange = maxValue - (maxValue % range);

  let rnd;
  do {
    const bytes = new Uint8Array(byteLength);
    crypto.getRandomValues(bytes);
    let value = 0;
    for (let i = 0; i < bytes.length; i++) {
      value = (value << 8) + bytes[i]!;
    }
    if (value < maxRange) {
      rnd = min + (value % range);
    }
  } while (rnd === undefined);

  return rnd;
}

export default function getRandomPassword() {
  const totalPasswords = PASSWORDS.length;

  // Always get a truly random index
  const selectedIndex = getRandomIndex(0, totalPasswords - 1);

  console.log(`Selected password set ${selectedIndex + 1} of ${totalPasswords}`);

  return { info: PASSWORDS[selectedIndex] };
}

// Export function to reset password history (useful for testing)
export function resetPasswordHistory() {
  // No longer needed but keeping for compatibility
}