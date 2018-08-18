export default function getPhoto(obj, method, media) {
  return 'print' === media ? obj[`${method}_hd`] : obj[`${method}_thumbnail`]
}
