export const DIGITS = '0123456789'
export const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function randomChar(alphabet: string) {
  return alphabet[Math.floor(Math.random() * alphabet.length)]
}

// One frame of a scramble: the first `settled` characters (and any spaces) are
// final, the rest are random picks from `alphabet`.
export function scramble(target: string, settled: number, alphabet: string) {
  let result = ''

  for (let i = 0; i < target.length; i++) {
    const char = target[i]
    result += i < settled || char === ' ' ? char : randomChar(alphabet)
  }

  return result
}
