export function padTwoDigits(value: number | string) {
  return value.toString().padStart(2, '0')
}
