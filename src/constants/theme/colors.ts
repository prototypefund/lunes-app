export const COLORS = {
  lunesBlack: '#000e38',
  lunesWhite: '#f9fafb',
  lunesGreyMedium: '#5b616a',
  lunesGreyDark: '#3a4049',
  white: '#ffffff',
  lunesBlackUltralight: '#e0e4ed',
  lunesFunctionalIncorrectDark: '#ff5252',
  lunesRedLight: '#f57f7a',
  lunesGreenLight: '#7ae6d8',
  lunesGreenMedium: '#20c5b4',
  lunesBlueLight: '#97aef1',
  lunesOrangeLight: '#ffbb4a',
  lunesArtikelDas: '#72f399',
  lunesArtikelDiePlural: '#eee12d',
  lunesArtikelDie: '#faa7a7',
  lunesArtikelDer: '#8cc8f3',
  lunesOverlay: 'rgba(0, 14, 56, 0.8)',
  lunesBlackLight: '#777e91',
  blue: '#0000FF',
  lunesFunctionalCorrectDark: '#0adb75',
  lunesFunctionalAlmostCorrectDark: '#ffbb4a',
  lunesRedDark: '#F1635F',
  lunesRed: '#ffa3a3',
  shadow: 'rgba(0, 0, 0, 0.6)',
  lunesBlackMedium: '#3d4662'
}

export type Color = typeof COLORS[keyof typeof COLORS]
