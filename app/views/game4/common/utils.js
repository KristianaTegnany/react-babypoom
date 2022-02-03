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

export function getTempUnit() {
  let temp = 100;

  if (window.screen.height < 768) {
    temp = 70;
  }

  if (window.screen.height <= 640 || window.screen.width <= 412) {
    temp = 70;
  }

  if (window.screen.height <= 480) {
    temp = 60;
  }
  if (window.screen.height <= 412) {
    temp = 40;
  }

  return temp;
}
