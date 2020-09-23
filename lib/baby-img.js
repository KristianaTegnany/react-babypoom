import imgPath from './img-path'
import range from './range'

const BABY_IMAGES = {}

range(1, 5).forEach((type) => {
  ;['M', 'F'].forEach((gender) => {
    const key = `${gender}${type}`
    BABY_IMAGES[key] = imgPath(`/baby-types/${key}.svg`)
  })
})

export default BABY_IMAGES
