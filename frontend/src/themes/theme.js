import { createTheme } from '@mui/material/styles'

export const defaultTheme = createTheme({
  palette: {
    custom: {
      dark: '#053742',
      main: '#39A2DB',
      light: '#A2DBFA',
      contrastText: '#E8F0F2',
    },
    primary: {
      dark: '#000000',
      main: '#069A8E',
      light: '#FF9F29',
      contrastText: '#FAF3E3',
    },
    notSoPrimary: {
      dark: '#005555',
      main: '#069A8E',
      light: '#A1E3D8',
      contrastText: '#E8F0F2',
    },
    boxes: {
      dark: '#FF5B00',
      main: '#36AE7C',
      light: '#187498',
      contrastText: '#e0e6b2',
    },
    chips: {
      dark: '#FF5B00',
      main: '#E8F0F2',
      light: '#187498',
      contrastText: '#e0e6b2',
    },
  },
})