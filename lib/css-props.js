export const transformProp =
  'undefined' !== typeof document &&
  (elt =>
    ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform'].find(
      prop => null != elt.style[prop]
    ))(document.createElement('div'))
