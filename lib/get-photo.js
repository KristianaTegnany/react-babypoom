export default function getPhoto(photo, pdf) {
  return pdf ? photo.hd : photo.thumbnail
}
