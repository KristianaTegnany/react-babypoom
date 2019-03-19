export default function getPhoto(obj, method, hd) {
  return hd ? (obj[method] || {}).hd : (obj[method] || {}).thumbnail
}
