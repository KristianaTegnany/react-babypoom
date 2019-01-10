export default function getPhoto(obj, method, media) {
  return 'print' === media ? (obj[method] || {}).hd : (obj[method] || {}).thumbnail
}
