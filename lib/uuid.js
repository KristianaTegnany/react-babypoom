// http://stackoverflow.com/a/2117523/1177228

const REG = /[xy]/g

export default function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(REG, updateChar)
}

function updateChar(c) {
  let r = (Math.random() * 16) | 0
  let v = c == 'x' ? r : (r & 0x3) | 0x8
  return v.toString(16)
}
