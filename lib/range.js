export default function range(from, to) {
  let arr = [from]
  let step = from < to ? 1 : -1
  while (from !== to) {
    from += step
    arr.push(from)
  }
  return arr
}
