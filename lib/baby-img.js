import imgPath from './img-path'
import range from './range'

const MAP = {}

range(1, 5).forEach(type => {
  ['M', 'F'].forEach(gender => {
    const key = `${gender}${type}`
    MAP[key] = imgPath(`/baby-types/${key}.svg`)
  })
})

export default MAP
