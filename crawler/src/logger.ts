export const logger = (...args: any[]) => {
  const timeStart = new Date()
  return console.log(
    `[${timeStart.toLocaleDateString()} ${timeStart.toLocaleTimeString()}]`,
    ...args
  )
}
