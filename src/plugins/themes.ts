const defaultColors = {
  white: '#fff',
  black: '#000',
  
  textGrey: '#b9b9b9',
  error: '#B00020',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FB8C00',
}

const light = {
  dark: false,
  colors: {
    'background-app': '#f9fafa',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    foreground: '#000000',
    'foreground-2': '#4E444B',
    label: '#6e6e6e',

    primary: '#e15517',
    'primary-darken': '#3700B3',
    secondary: '#02a6d0',
    'secondary-darken': '#018786',
    accent: '#162c59',

    ...defaultColors,
  },
}

const dark = {
  dark: true,
  colors: {
    ...defaultColors,
  },
}

export default { light, dark }
