import Welcome from '../welcome/Component'
import Game1 from '../game1/Component'
import Game2 from '../game2/Component'
import Game3 from '../game3/Component'
import Arrival from '../arrival/Component'
import Trip from '../trip/Component'
import VisitorBook from '../visitorbook/Component'
import Gift from '../gift/Component'
import Souvenir from '../souvenir/Component'

let nameToPaths = [
  ['welcome', { path: '/:uuid/', component: Welcome }],
  ['game', { path: '/:uuid/game', component: [Game1, Game2, Game3] }],
  ['arrival', { path: '/:uuid/my-info', component: Arrival }],
  ['trip', { path: '/:uuid/my-trip', component: Trip }],
  ['visitorbook', { path: '/:uuid/guest-book', component: VisitorBook }],
  ['gift', { path: '/:uuid/gifts', component: Gift }],
  ['souvenir', { path: '/:uuid/souvenir', component: Souvenir }],
]

export const PATH_TO_STEP_MAP = nameToPaths.reduce((h, entry) => {
  let [step, info] = entry
  h[info.path.replace('/:uuid/', '')] = step
  return h
}, {})

const DEFAULT = nameToPaths[0][1]

const NAMES_TO_PATHS = new Map(nameToPaths)

export function stepPath(name, bpoom) {
  return _stepInfo(name, bpoom, true)
}

export function stepComponent(name, bpoom) {
  return _stepInfo(name, bpoom, false)
}

export function rootPath(bpoom) {
  return stepPath(null, bpoom)
}

function _stepInfo(name, bpoom, path) {
  let info =
    (name != null && NAMES_TO_PATHS.get(name)) || NAMES_TO_PATHS.get((bpoom.available_steps || [])[0]) || DEFAULT
  return path
    ? info.path.replace(':uuid', bpoom.uuid)
    : 'game' === name
      ? info.component[(bpoom.game_type || (+(window.location.hash || '').substr(1) || 1)) - 1]
      : info.component
}
