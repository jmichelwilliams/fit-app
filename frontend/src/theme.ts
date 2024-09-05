import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: '"Oswald",sans-serif',
    h1: { fontWeight: 700, color: 'white !important' },
    h3: { color: 'white !important' },
    h5: { color: 'white !important' },
    button: { color: 'black ', fontSize: '18px' },
    body1: { color: 'rgb(252,163,17)' }
  }
})

export default theme
