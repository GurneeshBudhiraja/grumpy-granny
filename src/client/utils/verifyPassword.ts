/**
 * Check a candidate password against Granny's wacky rules.
 * Returns an object with overall success and individual hint completions.
 */

// Roman numeral conversion helper
function romanToNumber(roman: string): number {
  const romanNumerals: { [key: string]: number } = {
    'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000
  };
  
  let result = 0;
  for (let i = 0; i < roman.length; i++) {
    const current = romanNumerals[roman[i]];
    const next = romanNumerals[roman[i + 1]];
    
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
  completedHints: boolean[];
}

export async function checkWordlePassword(pwd: string): Promise<PasswordCheckResult> {
  const completedHints: boolean[] = [];
  
  // Granny's info from ID and documents
  const grannyInitials = "BG"; // Bertha Grumpington
  const grannyExName = "Melvin"; // From the document
  const romanNumeral = "XVII"; // 17 in Roman numerals
  const currentHour = new Date().getHours() % 12 || 12; // 1-12 format
  
  // 1) Must start with Granny's initials "BG"
  completedHints[0] = pwd.startsWith(grannyInitials);

  // 2) Must include exactly three "5"s
  const fives = (pwd.match(/5/g) || []).length;
  completedHints[1] = fives === 3;

  // 3) Must include the exact Roman numeral XVII (17)
  completedHints[2] = pwd.includes(romanNumeral);

  // 4) Digits sum to 69 (including Roman numeral conversion)
  let digitSum = 0;
  // Add regular digits
  pwd.split('').forEach(char => {
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
  const bangs = (pwd.match(/!/g) || []).length;
  completedHints[5] = bangs === 1;

  // 7) Must include the current hour (1–12) as a substring
  const hourStr = currentHour.toString();
  completedHints[6] = pwd.includes(hourStr);

  // 8) Must end with "DD"
  completedHints[7] = pwd.endsWith('DD');

  // Overall validation - all hints must be completed
  const isValid = completedHints.every(hint => hint);

  return {
    isValid,
    completedHints
  };
}