export function getWinContainerHeight() {
  let height = 450;

  if (window.screen.height >= 640 && window.screen.height <= 750) {
    height = 300;
  }

  if (window.screen.height <= 640 || window.screen.width <= 412) {
    height = 300;
  }

  if (window.screen.height <= 480) {
    height = 300;
  }
  if (window.screen.height <= 412) {
    height = 200;
  }

  return height;
}
