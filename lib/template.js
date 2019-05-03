const REG_D_QUOTES = /"/g
const REG_EOL = /(\n)/gm
const REG_INTERPOLATE = /([^\{])\{\{([^\{\}]*)\}\}([^\}])/gm

var template = str =>
  new Function(
    'd',
    'return "' +
      str
        .replace(REG_EOL, '\\n')
        .replace(REG_D_QUOTES, '\\"')
        .replace(REG_INTERPOLATE, '$1"+(d.$2 || "")+"$3') +
      '"',
  )

export default template
