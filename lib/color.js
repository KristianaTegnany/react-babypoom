export { lighten, rgba, darken, isDarkContrast }

function lighten(cssValue, amt) {
  let color = rgbaToHsla(cssValueToRgba(cssValue))
  color[2] += amt
  color[2] = color[2] < 0 ? 0 : color[2] > 100 ? 100 : color[2]
  return toCssValue(hslaToRgba(color))
}

function rgba(cssValue, amt) {
  let color = cssValueToRgba(cssValue)
  return toCssValue([color[0], color[1], color[2], amt])
}

function darken(cssValue, amt) {
  return lighten(cssValue, -amt)
}

function luminance(c) {
  let r = c[0] / 255
  let g = c[1] / 255
  let b = c[2] / 255
  r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4)
  g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4)
  b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4)
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) * c[3]
}

function isDarkContrast(cssValue) {
  return luminance(cssValueToRgba(cssValue)) <= 0.179
}

function toCssValue(c) {
  return c[3] < 1 ? 'rgba(' + c.join(',') + ')' : '#' + toHex(c[0]) + toHex(c[1]) + toHex(c[2])
}

function toHex(n) {
  return ('0' + n.toString(16)).slice(-2)
}

function parseRgbOrHsl(str) {
  return str.slice(str.indexOf('(') + 1, str.indexOf(')')).split(',')
}

function cssValueToRgba(value) {
  value = (value || '').trim()
  if (!value.indexOf('rgb')) {
    let arr = parseRgbOrHsl(value)
    return [+arr[0], +arr[1], +arr[2], +(arr[3] || 1)]
  }
  if (!value.indexOf('hsl')) {
    let arr = parseRgbOrHsl(value)
    return hslaToRgba([arr[0], parseInt(arr[1]), parseInt(arr[2]), +(arr[3] || 1)])
  }
  return hexToRgba(value)
}

function hexToRgba(hex) {
  if (hex.length < 5) {
    hex = '0x' + hex.charAt(1) + hex.charAt(1) + hex.charAt(2) + hex.charAt(2) + hex.charAt(3) + hex.charAt(3)
  } else {
    hex = '0x' + hex.slice(1)
  }
  return [(hex >> 16) & 255, (hex >> 8) & 255, hex & 255, 1]
}

function rgbaToHsla(color) {
  let r = color[0] / 255
  let g = color[1] / 255
  let b = color[2] / 255

  let max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  let h,
    s,
    l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    let d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }
  return [Math.floor(h * 360), Math.floor(s * 100), Math.floor(l * 100), color[3]]
}

function hslaToRgba(color) {
  let h = color[0],
    s = color[1] / 100,
    l = color[2] / 100,
    a = color[3]
  let chroma = (1 - Math.abs(2 * l - 1)) * s
  let huePrime = h / 60
  let secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1))
  let la = l - chroma / 2
  let v0 = Math.round((la + chroma) * 255)
  let v1 = Math.round((la + secondComponent) * 255)
  let v2 = Math.round(la * 255)
  switch (huePrime | 0) {
    case 0:
      return [v0, v1, v2, a]
    case 1:
      return [v1, v0, v2, a]
    case 2:
      return [v2, v0, v1, a]
    case 3:
      return [v2, v1, v0, a]
    case 4:
      return [v1, v2, v0, a]
    case 5:
      return [v0, v2, v1, a]
  }
}
