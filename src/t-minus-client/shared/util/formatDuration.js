const HoursInDay = 24
const MinutesInHour = 60
const SecondsInMinute = 60
const MillisecondsInSecond = 1000
const DefaultValue = 0
const FractionalPartOfNum = 1

export default function formatDuration (duration) {
  let d, h, m, ms, s
  d = h = m = s = ms = DefaultValue
  if (duration) {
    ms = Math.abs(Math.floor(((duration / MillisecondsInSecond) % FractionalPartOfNum) * MillisecondsInSecond))
    s = Math.abs(Math.floor(duration / MillisecondsInSecond))
    m = Math.abs(Math.floor(s / SecondsInMinute))
    s = s % SecondsInMinute
    h = Math.abs(Math.floor(m / MinutesInHour))
    m = m % MinutesInHour
    d = Math.abs(Math.floor(h / HoursInDay))
    h = h % HoursInDay
  }
  return { d, h, m, ms, s }
}
