export function addClass(elt, className) {
  elt.className += ` ${className}`
}

export function removeClass(elt, className) {
  className = ` ${className} `
  let cName = ` ${elt.className} `
  while (cName.includes(className)) {
    cName = cName.replace(className, ' ')
  }
  elt.className = cName.trim()
}
