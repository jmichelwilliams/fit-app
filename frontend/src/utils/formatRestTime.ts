export const formatRestTime = (restTime: string): string => {
  const [minutes, seconds] = restTime
    .split(':')
    .map((part: string) => parseInt(part))

  if (minutes > 0 && seconds > 0) {
    return `${minutes} minutes ${seconds} seconds`
  } else if (minutes > 0) {
    return `${minutes} minutes`
  } else {
    return `${seconds} seconds`
  }
}
