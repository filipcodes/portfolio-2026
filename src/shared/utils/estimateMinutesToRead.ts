const AVERAGE_READING_SPEED = 230 // Words per Minute

export function estimateMinutesToRead(text: string) {
  const numberOfWords = text.match(/\S+/g)?.length ?? 0

  const minutesToRead = Math.ceil(numberOfWords / AVERAGE_READING_SPEED)

  return minutesToRead
}
