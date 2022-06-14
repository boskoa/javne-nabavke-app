import { CssBaseline, ThemeProvider } from '@mui/material'
import { defaultTheme } from './themes/theme'
import Navbar from './components/Navbar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import MyAppBar from './components/AppBar'
import { Routes, Route } from 'react-router-dom'
import ProceduresTable from './components/ProceduresTable'
import Users from './components/Users'
import HomePage from './components/HomePage'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initProcedures } from './reducers/procedureReducer'
import Intro from './components/Intro'
import { login } from './reducers/loginReducer'
import procedureServices from './services/procedures'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import ProcedureView from './components/ProcedureView'

const App = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.login.data.username)
  console.log('CURRENT', currentUser)
  const snackValues = useSelector((state) => state.snack.data)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTenderUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(login(user))
      procedureServices.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(initProcedures())
  }, [])

  if (window.localStorage.getItem('loggedTenderUser')) {
    return (
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline enableColorScheme />
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <MyAppBar />
          <Navbar />
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
          >
            <Toolbar />
            <Routes>
              <Route path='/procedures/:id' element={<ProcedureView />} />
              <Route path='/procedures' element={<ProceduresTable />} />
              <Route path='/users' element={<Users />} />
              <Route path='/' element={<HomePage />} />
            </Routes>
          </Box>
          <Snackbar open={snackValues.open}>
            <MuiAlert severity={snackValues.severity} sx={{ width: '100%' }}>
              {snackValues.message}
            </MuiAlert>
          </Snackbar>
        </Box>
      </ThemeProvider>
    )
  } else {
    return (
      <div>
        <Intro />
        <Snackbar open={snackValues.open}>
          <MuiAlert severity={snackValues.severity} sx={{ width: '100%' }}>
            {snackValues.message}
          </MuiAlert>
        </Snackbar>
      </div>
    )
  }
}

export default App