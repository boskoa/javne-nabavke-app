import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { HashRouter as Router } from 'react-router-dom'
import store from './store'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { defaultTheme } from './themes/theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={defaultTheme}>
    <CssBaseline enableColorScheme />
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </ThemeProvider>
)
