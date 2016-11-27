export default function formatDuration (duration) {
  let d, h, m, ms, s
  d = h = m = s = ms = 0
  if (duration) {
    ms = Math.abs(Math.floor(((duration / 1000) % 1) * 1000))
    s = Math.abs(Math.floor(duration / 1000))
    m = Math.abs(Math.floor(s / 60))
    s = s % 60
    h = Math.abs(Math.floor(m / 60))
    m = m % 60
    d = Math.abs(Math.floor(h / 24))
    h = h % 24
  }
  return { d, h, m, ms, s }
}
