export default (photo, type) => (photo ? photo[type] : null)

export function createPhotoURLs(url) {
  return {
    thumbnail: url,
    normal: url,
    hd: url,
  }
}
