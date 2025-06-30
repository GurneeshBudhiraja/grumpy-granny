/**
 * Enhanced password verification system for Granny's dynamic hints.
 * Supports multiple password patterns with varying complexity.
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

export async function checkCombinedPassword(pwd: string): Promise<PasswordCheckResult> {
  // Check all hint sets and return the one with the most completed hints
  const results = [
    await checkHintSet1(pwd),
    await checkHintSet2(pwd),
    await checkHintSet3(pwd),
    await checkHintSet4(pwd),
    await checkHintSet5(pwd)
  ];

  // Find the result with the most completed hints
  let bestResult = results[0]!;
  let maxCompleted = bestResult.completedHints.filter(Boolean).length;

  for (const result of results) {
    const completed = result.completedHints.filter(Boolean).length;
    if (completed > maxCompleted) {
      maxCompleted = completed;
      bestResult = result;
    }
  }

  // If multiple hint sets have the same number of completed hints, prefer the one that matches the pattern better
  if (maxCompleted > 0) {
    const tiedResults = results.filter(result => 
      result.completedHints.filter(Boolean).length === maxCompleted
    );
    
    if (tiedResults.length > 1) {
      // Use pattern matching to determine the most likely intended hint set
      const hintSetIndex = determineHintSetByPattern(pwd);
      if (hintSetIndex >= 0 && hintSetIndex < results.length) {
        const patternResult = results[hintSetIndex]!;
        if (patternResult.completedHints.filter(Boolean).length === maxCompleted) {
          bestResult = patternResult;
        }
      }
    }
  }

  return bestResult;
}

function determineHintSetByPattern(pwd: string): number {
  // More sophisticated pattern matching
  const patterns = [
    // Hint Set 1: BG + ends with DD + has !!
    () => pwd.startsWith('BG') && pwd.endsWith('DD') && pwd.includes('!!'),
    // Hint Set 2: starts with 73 + ends with GG + has ~
    () => pwd.startsWith('73') && pwd.endsWith('GG') && pwd.includes('~'),
    // Hint Set 3: starts with BG73 + ends with XO + has ???
    () => pwd.startsWith('BG73') && pwd.endsWith('XO') && pwd.includes('???'),
    // Hint Set 4: starts with BGBG + ends with !! + has &
    () => pwd.startsWith('BGBG') && pwd.endsWith('!!') && pwd.includes('&'),
    // Hint Set 5: starts with 1951 + ends with ZZ + has ~~
    () => pwd.startsWith('1951') && pwd.endsWith('ZZ') && pwd.includes('~~')
  ];

  for (let i = 0; i < patterns.length; i++) {
    if (patterns[i]!()) {
      return i;
    }
  }

  // If no clear pattern match, check for partial patterns
  if (pwd.startsWith('BG') && !pwd.startsWith('BGBG')) return 0; // Hint Set 1
  if (pwd.startsWith('73')) return 1; // Hint Set 2
  if (pwd.startsWith('BG73')) return 2; // Hint Set 3
  if (pwd.startsWith('BGBG')) return 3; // Hint Set 4
  if (pwd.startsWith('1951')) return 4; // Hint Set 5

  return 0; // Default to hint set 1
}

// Hint Set 1: BG + 555 + XVII + Melvin + hour + !! + 1951 + sum=69 + DD
async function checkHintSet1(pwd: string): Promise<PasswordCheckResult> {
  const completedHints = new Array<boolean>(9).fill(false);
  
  const grannyInitials = "BG";
  const grannyExName = "Melvin";
  const romanNumeral = "XVII"; // 17
  const grannyBirthYear = "1951";
  const currentHour = new Date().getHours() % 12 || 12;

  // 1) Must start with Granny's initials "BG"
  completedHints[0] = pwd.startsWith(grannyInitials);

  // 2) Must include exactly three "5"s
  const fives = (pwd.match(/5/g) || []).length;
  completedHints[1] = fives === 3;

  // 3) Must include the exact Roman numeral XVII (17)
  completedHints[2] = pwd.includes(romanNumeral);

  // 4) Must include Granny's ex's name "Melvin" (case insensitive)
  completedHints[3] = pwd.toLowerCase().includes(grannyExName.toLowerCase());

  // 5) Must include the current hour (1–12) as a substring
  const hourStr = currentHour.toString();
  completedHints[4] = pwd.includes(hourStr);

  // 6) Exactly two exclamation marks
  const bangs = (pwd.match(/!/g) || []).length;
  completedHints[5] = bangs === 2;

  // 7) Must include birth year
  completedHints[6] = pwd.includes(grannyBirthYear);

  // 8) Digits sum to 69 (including Roman numeral conversion)
  let digitSum = 0;
  pwd.split('').forEach((char: string) => {
    if (/\d/.test(char)) {
      digitSum += parseInt(char, 10);
    }
  });
  if (pwd.includes(romanNumeral)) {
    digitSum += romanToNumber(romanNumeral);
  }
  completedHints[7] = digitSum === 69;

  // 9) Must end with "DD"
  completedHints[8] = pwd.endsWith('DD');

  const isValid = completedHints.every((hint: boolean): boolean => hint);
  return { isValid, completedHints: completedHints as readonly boolean[] };
}

// Hint Set 2: 73 + 7777 + XII + melvin + day + ~ + GB + sum=77 + GG
async function checkHintSet2(pwd: string): Promise<PasswordCheckResult> {
  const completedHints = new Array<boolean>(9).fill(false);
  
  const grannyAge = "73";
  const grannyExName = "melvin";
  const romanNumeral = "XII"; // 12
  const currentDay = new Date().getDate();

  // 1) Must start with Granny's age "73"
  completedHints[0] = pwd.startsWith(grannyAge);

  // 2) Must include exactly four "7"s
  const sevens = (pwd.match(/7/g) || []).length;
  completedHints[1] = sevens === 4;

  // 3) Must include the exact Roman numeral XII (12)
  completedHints[2] = pwd.includes(romanNumeral);

  // 4) Must include ex's name in lowercase
  completedHints[3] = pwd.includes(grannyExName);

  // 5) Must include today's day of the month (1-31) as a substring
  const dayStr = currentDay.toString();
  const dayStrPadded = currentDay.toString().padStart(2, '0');
  completedHints[4] = pwd.includes(dayStr) || pwd.includes(dayStrPadded);

  // 6) Exactly one tilde "~"
  const tildes = (pwd.match(/~/g) || []).length;
  completedHints[5] = tildes === 1;

  // 7) Must include initials in reverse order "GB"
  completedHints[6] = pwd.includes("GB");

  // 8) Digits sum to 77 (including Roman numeral conversion)
  let digitSum = 0;
  pwd.split('').forEach((char: string) => {
    if (/\d/.test(char)) {
      digitSum += parseInt(char, 10);
    }
  });
  if (pwd.includes(romanNumeral)) {
    digitSum += romanToNumber(romanNumeral);
  }
  completedHints[7] = digitSum === 77;

  // 9) Must end with "GG"
  completedHints[8] = pwd.endsWith('GG');

  const isValid = completedHints.every((hint: boolean): boolean => hint);
  return { isValid, completedHints: completedHints as readonly boolean[] };
}

// Hint Set 3: BG73 + 99 + XXI + MELVIN + minute + ??? + 1951 + sum=88 + XO
async function checkHintSet3(pwd: string): Promise<PasswordCheckResult> {
  const completedHints = new Array<boolean>(9).fill(false);
  
  const prefix = "BG73";
  const grannyExName = "MELVIN";
  const romanNumeral = "XXI"; // 21
  const grannyBirthYear = "1951";
  const currentMinute = new Date().getMinutes();

  // 1) Must start with "BG73"
  completedHints[0] = pwd.startsWith(prefix);

  // 2) Must include exactly two "9"s
  const nines = (pwd.match(/9/g) || []).length;
  completedHints[1] = nines === 2;

  // 3) Must include the exact Roman numeral XXI (21)
  completedHints[2] = pwd.includes(romanNumeral);

  // 4) Must include "MELVIN" in all caps
  completedHints[3] = pwd.includes(grannyExName);

  // 5) Must include current minute (00-59) as a substring
  const minuteStr = currentMinute.toString();
  const minuteStrPadded = currentMinute.toString().padStart(2, '0');
  completedHints[4] = pwd.includes(minuteStr) || pwd.includes(minuteStrPadded);

  // 6) Exactly three question marks
  const questions = (pwd.match(/\?/g) || []).length;
  completedHints[5] = questions === 3;

  // 7) Must include birth year
  completedHints[6] = pwd.includes(grannyBirthYear);

  // 8) Digits sum to 88 (including Roman numeral conversion)
  let digitSum = 0;
  pwd.split('').forEach((char: string) => {
    if (/\d/.test(char)) {
      digitSum += parseInt(char, 10);
    }
  });
  if (pwd.includes(romanNumeral)) {
    digitSum += romanToNumber(romanNumeral);
  }
  completedHints[7] = digitSum === 88;

  // 9) Must end with "XO"
  completedHints[8] = pwd.endsWith('XO');

  const isValid = completedHints.every((hint: boolean): boolean => hint);
  return { isValid, completedHints: completedHints as readonly boolean[] };
}

// Hint Set 4: BGBG + 11111 + XV + melvin + hour24 + & + 73 + sum=55 + !!
async function checkHintSet4(pwd: string): Promise<PasswordCheckResult> {
  const completedHints = new Array<boolean>(9).fill(false);
  
  const prefix = "BGBG";
  const grannyExName = "melvin";
  const romanNumeral = "XV"; // 15
  const currentHour24 = new Date().getHours();

  // 1) Must start with "BGBG"
  completedHints[0] = pwd.startsWith(prefix);

  // 2) Must include exactly five "1"s
  const ones = (pwd.match(/1/g) || []).length;
  completedHints[1] = ones === 5;

  // 3) Must include the exact Roman numeral XV (15)
  completedHints[2] = pwd.includes(romanNumeral);

  // 4) Must include "melvin" in lowercase
  completedHints[3] = pwd.includes(grannyExName);

  // 5) Must include current hour in 24-hour format (00-23)
  const hour24Str = currentHour24.toString();
  const hour24StrPadded = currentHour24.toString().padStart(2, '0');
  completedHints[4] = pwd.includes(hour24Str) || pwd.includes(hour24StrPadded);

  // 6) Exactly one ampersand "&"
  const ampersands = (pwd.match(/&/g) || []).length;
  completedHints[5] = ampersands === 1;

  // 7) Must include "73"
  completedHints[6] = pwd.includes("73");

  // 8) Digits sum to 55 (including Roman numeral conversion)
  let digitSum = 0;
  pwd.split('').forEach((char: string) => {
    if (/\d/.test(char)) {
      digitSum += parseInt(char, 10);
    }
  });
  if (pwd.includes(romanNumeral)) {
    digitSum += romanToNumber(romanNumeral);
  }
  completedHints[7] = digitSum === 55;

  // 9) Must end with "!!"
  completedHints[8] = pwd.endsWith('!!');

  const isValid = completedHints.every((hint: boolean): boolean => hint);
  return { isValid, completedHints: completedHints as readonly boolean[] };
}

// Hint Set 5: 1951 + 333 + VIII + MELVINGONE + date + ~~ + 37 + sum=99 + ZZ
async function checkHintSet5(pwd: string): Promise<PasswordCheckResult> {
  const completedHints = new Array<boolean>(9).fill(false);
  
  const grannyBirthYear = "1951";
  const romanNumeral = "VIII"; // 8
  const currentDate = new Date().getDate();

  // 1) Must start with birth year "1951"
  completedHints[0] = pwd.startsWith(grannyBirthYear);

  // 2) Must include exactly three "3"s
  const threes = (pwd.match(/3/g) || []).length;
  completedHints[1] = threes === 3;

  // 3) Must include the exact Roman numeral VIII (8)
  completedHints[2] = pwd.includes(romanNumeral);

  // 4) Must include "MELVIN" followed by "GONE" (can be together or separate)
  const hasMelvinGone = pwd.includes("MELVINGONE") || 
                       (pwd.includes("MELVIN") && pwd.includes("GONE"));
  completedHints[3] = hasMelvinGone;

  // 5) Must include today's date (DD format)
  const dateStr = currentDate.toString();
  const dateStrPadded = currentDate.toString().padStart(2, '0');
  completedHints[4] = pwd.includes(dateStr) || pwd.includes(dateStrPadded);

  // 6) Exactly two tildes "~~"
  const tildes = (pwd.match(/~/g) || []).length;
  completedHints[5] = tildes === 2;

  // 7) Must include age backwards "37"
  completedHints[6] = pwd.includes("37");

  // 8) Digits sum to 99 (including Roman numeral conversion)
  let digitSum = 0;
  pwd.split('').forEach((char: string) => {
    if (/\d/.test(char)) {
      digitSum += parseInt(char, 10);
    }
  });
  if (pwd.includes(romanNumeral)) {
    digitSum += romanToNumber(romanNumeral);
  }
  completedHints[7] = digitSum === 99;

  // 9) Must end with "ZZ"
  completedHints[8] = pwd.endsWith('ZZ');

  const isValid = completedHints.every((hint: boolean): boolean => hint);
  return { isValid, completedHints: completedHints as readonly boolean[] };
}

// Legacy functions for backward compatibility
export async function checkWordlePassword(pwd: string): Promise<PasswordCheckResult> {
  return checkCombinedPassword(pwd);
}

export async function checkGrannyAgePassword(pwd: string): Promise<PasswordCheckResult> {
  return checkCombinedPassword(pwd);
}