/**
 * Check a candidate password against Granny's wacky rules.
 * Returns an object with overall success and individual hint completions.
 */

// Roman numeral conversion helper
function romanToNumber(roman: string): number {
  const romanNumerals: Record<string, number> = {
    'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000
  };

  let result = 0;
  for (let i = 0; i < roman.length; i++) {
    const currentChar = roman[i]!;
    const nextChar = roman[i + 1];
    const current = romanNumerals[currentChar] ?? 0;
    const next = nextChar !== undefined ? romanNumerals[nextChar] ?? 0 : 0;

    if (next && current < next) {
      result += next - current;
      i++; // Skip next character
    } else {
      result += current;
    }
  }
  return result;
}

export interface PasswordCheckResult {
  isValid: boolean;
  completedHints: readonly boolean[];
}

export async function checkWordlePassword(pwd: string): Promise<PasswordCheckResult> {
  const completedHints = new Array<boolean>(8).fill(false);

  // Granny's info from ID and documents
  const grannyInitials = "BG"; // Bertha Grumpington
  const grannyExName = "Melvin"; // From the document
  const romanNumeral = "XVII"; // 17 in Roman numerals
  const currentHour: number = new Date().getHours() % 12 || 12; // 1-12 format

  // 1) Must start with Granny's initials "BG"
  completedHints[0] = pwd.startsWith(grannyInitials);

  // 2) Must include exactly three "5"s
  const fives: number = (pwd.match(/5/g) || []).length;
  completedHints[1] = fives === 3;

  // 3) Must include the exact Roman numeral XVII (17)
  completedHints[2] = pwd.includes(romanNumeral);

  // 4) Digits sum to 69 (including Roman numeral conversion)
  let digitSum = 0;
  // Add regular digits
  pwd.split('').forEach((char: string) => {
    if (/\d/.test(char)) {
      digitSum += parseInt(char, 10);
    }
  });
  // Add Roman numeral value if present
  if (pwd.includes(romanNumeral)) {
    digitSum += romanToNumber(romanNumeral);
  }
  completedHints[3] = digitSum === 69;

  // 5) Must include Granny's ex's name "Melvin"
  completedHints[4] = pwd.toLowerCase().includes(grannyExName.toLowerCase());

  // 6) Exactly one exclamation mark
  const bangs: number = (pwd.match(/!/g) || []).length;
  completedHints[5] = bangs === 1;

  // 7) Must include the current hour (1–12) as a substring
  const hourStr: string = currentHour.toString();
  completedHints[6] = pwd.includes(hourStr);

  // 8) Must end with "DD"
  completedHints[7] = pwd.endsWith('DD');

  // Overall validation - all hints must be completed
  const isValid: boolean = completedHints.every((hint: boolean): boolean => hint);

  return {
    isValid,
    completedHints: completedHints as readonly boolean[]
  };
}

export async function checkGrannyAgePassword(pwd: string): Promise<PasswordCheckResult> {
  const completedHints = new Array<boolean>(8).fill(false);

  // Granny's info
  const grannyAge = "73"; // From ID card
  const romanNumeral = "XII"; // 12 in Roman numerals
  const grannyBirthYear = "1951"; // From the quote in ID card
  const currentDay = new Date().getDate(); // 1-31

  // 1) Must start with Granny's age "73"
  completedHints[0] = pwd.startsWith(grannyAge);

  // 2) Must include exactly three "7"s
  const sevens: number = (pwd.match(/7/g) || []).length;
  completedHints[1] = sevens === 3;

  // 3) Must include the exact Roman numeral XII (12)
  completedHints[2] = pwd.includes(romanNumeral);

  // 4) Digits sum to 60 (including Roman numeral conversion)
  let digitSum = 0;
  // Add regular digits
  pwd.split('').forEach((char: string) => {
    if (/\d/.test(char)) {
      digitSum += parseInt(char, 10);
    }
  });
  // Add Roman numeral value if present
  if (pwd.includes(romanNumeral)) {
    digitSum += romanToNumber(romanNumeral);
  }
  completedHints[3] = digitSum === 60;

  // 5) Must include Granny's birth year "1951"
  completedHints[4] = pwd.includes(grannyBirthYear);

  // 6) Exactly one tilde "~"
  const tildes: number = (pwd.match(/~/g) || []).length;
  completedHints[5] = tildes === 1;

  // 7) Must include today's day of the month (1-31) as a substring
  const dayStr: string = currentDay.toString();
  completedHints[6] = pwd.includes(dayStr);

  // 8) Must end with "!!"
  completedHints[7] = pwd.endsWith('!!');

  // Overall validation - all hints must be completed
  const isValid: boolean = completedHints.every((hint: boolean): boolean => hint);

  return {
    isValid,
    completedHints: completedHints as readonly boolean[]
  };
}