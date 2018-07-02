import { lighten, darken, isDarkContrast } from './color'

const NEUTRAL_COLOR = '#414141'
const NEUTRAL_COLORS = [
  NEUTRAL_COLOR,
  lighten(NEUTRAL_COLOR, 15), // color A
  lighten(NEUTRAL_COLOR, 30), // color B
  lighten(NEUTRAL_COLOR, 50), // color C
  lighten(NEUTRAL_COLOR, 65), // color D
  lighten(NEUTRAL_COLOR, 70), // color E
  lighten(NEUTRAL_COLOR, 75), // color F
]

const COLOR_SUFFIXES = ['', '-A', '-B', '-C', '-D', '-E', '-F']

export default function computeThemeColors(color1, color2) {
  let isDarkColor1 = true // isDark(color1)
  let isDarkColor2 = false // isDark(color2)
  let method1 = isDarkColor1 ? lighten : darken
  let method2 = isDarkColor2 ? lighten : darken

  // Primary & secondary colors
  const theme = {
    '--brand-primary': color1, // 1E
    '--brand-secondary': color2, // 2D
    '--brand-primary-A': method1(color1, 15), // color 1 - 1F
    '--brand-primary-B': method1(color1, 10), // color 1A - 1D
    '--brand-primary-C': method1(color1, 20), // color 1C
    '--brand-primary-D': (isDarkColor1 ? darken : lighten)(color1, 5), // color 1B
    '--brand-secondary-A': method2(color2, 15), // color 2 - 2C
    '--brand-secondary-B': method2(color2, 30), // color 2A - 2E
    '--brand-secondary-C': method2(color2, 10), // color 2B
    '--brand-secondary-text': isDarkContrast(color2) ? color2 : darken(color2, 20),
    '--neutral-secondary-text': NEUTRAL_COLORS[isDarkContrast(color2) ? NEUTRAL_COLORS.length - 1 : 1],
  }

  // Neutral colors
  let neutralPrimaryColors = NEUTRAL_COLORS //isDarkColor1 ? NEUTRAL_COLORS : NEUTRAL_COLORS.slice().reverse()
  let neutralSecondaryColors = NEUTRAL_COLORS //isDarkColor2 ? NEUTRAL_COLORS : NEUTRAL_COLORS.slice().reverse()
  COLOR_SUFFIXES.forEach((suffix, index) => {
    theme[`--neutral-primary${suffix}`] = neutralPrimaryColors[index]
    theme[`--neutral-secondary${suffix}`] = neutralSecondaryColors[index]
  })

  return theme
}
