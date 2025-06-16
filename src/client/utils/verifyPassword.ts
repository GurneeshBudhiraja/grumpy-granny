/**
 * Check a candidate password against Granny’s wacky rules.
 *
 * @param pwd        The user’s password attempt.
 * @param expected   The dynamic pieces Granny’s hints mention.
 *                     - roman:    e.g. "XIV"
 *                     - wordle:   e.g. "CRANE"
 *                     - hour:     1–12
 * @returns         True if it passes every single rule.
 */
export async function checkWordlePassword(
  pwd: string,
  expected: {
    roman: string
    wordle: string
    hour: number
  }
): boolean {
  // 1) Must start with Granny’s initials “GG”
  if (!pwd.startsWith('GG')) return false

  // 2) Must include exactly three “5”s
  const fives = (pwd.match(/5/g) || []).length
  if (fives !== 3) return false

  // 3) Must include the exact Roman numeral
  if (!pwd.includes(expected.roman)) return false

  // 4) Must include today’s Wordle answer
  if (!pwd.includes(expected.wordle)) return false

  // 5) Digits sum to 69
  const digitSum = pwd
    .split('')
    .filter((c) => /\d/.test(c))
    .map((c) => parseInt(c, 10))
    .reduce((a, b) => a + b, 0)
  if (digitSum !== 69) return false

  // 6) Must include Granny’s ex’s name “test”
  if (!pwd.includes('test')) return false

  // 7) Exactly one exclamation mark
  const bangs = (pwd.match(/!/g) || []).length
  if (bangs !== 1) return false

  // 8) Must include the current hour (1–12) as a substring
  const hourStr = expected.hour.toString()
  if (!pwd.includes(hourStr)) return false

  // 9) Must end with “DD”
  if (!pwd.endsWith('DD')) return false

  // All checks passed!
  return true
}

// Example usage:
const dynamic = {
  roman: 'XVII',     // whatever you randomized
  wordle: 'CRANE',   // fetched from your Wordle service
  hour: 7          // current hour
}
