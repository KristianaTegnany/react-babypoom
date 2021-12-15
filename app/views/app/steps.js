import Welcome from "../welcome";
import Game1 from "../game1";
import Game2 from "../game2";
import Game3 from "../game3";
import Game4 from "../game4";
import Arrival from "../arrival";
import Trip from "../trip";
import GuestBook from "../guest-book";
import Pot from "../pot";
import Souvenir from "../souvenir";

let nameToPaths = [
  ["welcome", { path: "/:uuid/", component: Welcome }],
  ["game", { path: "/:uuid/game", component: [Game1, Game2, Game3, Game4] }],
  ["arrival", { path: "/:uuid/my-info", component: Arrival }],
  ["trip", { path: "/:uuid/my-trip", component: Trip }],
  ["guest_book", { path: "/:uuid/guest-book", component: GuestBook }],
  ["pot", { path: "/:uuid/pot", component: Pot }],
  ["souvenir", { path: "/:uuid/souvenir", component: Souvenir }],
];

export const PATH_TO_STEP_MAP = nameToPaths.reduce((h, entry) => {
  let [step, info] = entry;
  h[info.path.replace("/:uuid/", "")] = step;
  return h;
}, {});

const DEFAULT = nameToPaths[0][1];

export const NAMES_TO_PATHS = new Map(nameToPaths);

export const stepPath = (name, bpoom) => _stepInfo(name, bpoom, true);

export const stepComponent = (name, bpoom) => _stepInfo(name, bpoom, false);

export const rootPath = (bpoom) => stepPath(null, bpoom);

function _stepInfo(name, bpoom, path) {
  const fakeGameType = 4;

  let info =
    (name != null && NAMES_TO_PATHS.get(name)) ||
    NAMES_TO_PATHS.get((bpoom.available_steps || [])[0]) ||
    DEFAULT;

  return path
    ? info.path.replace(":uuid", bpoom.uuid)
    : "game" === name
    ? // ? info.component[bpoom.game_type - 1]
      info.component[fakeGameType - 1]
    : info.component;
}
