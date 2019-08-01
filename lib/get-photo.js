export default function getPhoto(photo, hd) {
  return photo ? photo[hd ? 'hd' : 'thumbnail'] : null
}
