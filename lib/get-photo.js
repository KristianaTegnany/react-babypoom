export default function getPhoto(photo, media) {
  return 'print' === media ? photo.hd : photo.thumbnail
}
