import imgPath from './img-path'
import range from './range'

const BABY_IMAGES = {}

range(1, 5).forEach((type) => {
  ;['M', 'F'].forEach((gender) => {
    const key = `${gender}${type}`
    BABY_IMAGES[key] = imgPath(`/baby-types/${key}.svg`)
  })
})

BABY_IMAGES.default = BABY_IMAGES.M1

export default BABY_IMAGES
