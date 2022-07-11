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
import avatarServices from './services/avatar'
import notificationServices from './services/notifications'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import MuiAlertTitle from '@mui/material/AlertTitle'
import ProcedureView from './components/ProcedureView'
import AuthoritiesTable from './components/AuthoritiesTable'
import Analysis from './components/Analysis'
import ProfileSettings from './components/ProfileSettings'
import Notifications from './components/Notifications'
import { removeSnack } from './reducers/snackReducer'
import UserView from './components/UserView'
import { getAllOverviewThunk } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.login.data.username)
  console.log('CURRENT', currentUser)
  const snackValues = useSelector((state) => state.snack.data)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTenderUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      notificationServices.setToken(user.token)
      procedureServices.setToken(user.token)
      avatarServices.setToken(user.token)
      dispatch(login(user))
    }
  }, [])

  useEffect(() => {
    dispatch(initProcedures())
    dispatch(getAllOverviewThunk())
  }, [])

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      dispatch(removeSnack())//staviti da se produžuju alarm dokle god se ne ugasi
    }
  }

  if (currentUser) {
    return (
      <Box sx={{ display: 'flex' }}>
        <MyAppBar />
        <Navbar />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          <Routes>
            <Route
              path='/procedures/:id'
              element={<ProcedureView />}
            />
            <Route path='/procedures' element={<ProceduresTable />} />
            <Route path='/profile' element={<ProfileSettings />} />
            <Route path='/userview/:id' element={<UserView />} />
            <Route path='/users' element={<Users />} />
            <Route path='/authorities' element={<AuthoritiesTable />} />
            <Route path='/analysis' element={<Analysis />} />
            <Route
              path='/notifications'
              element={<Notifications />}
            />
            <Route path='/' element={<HomePage />} />
          </Routes>
        </Box>
        <Snackbar open={snackValues.open} onClose={handleSnackClose}>
          <MuiAlert
            variant="filled"
            severity={snackValues.severity}
            sx={{ width: '100%' }}
          >
            {snackValues.authority && <MuiAlertTitle>
              {snackValues.authority} - {snackValues.procedure}
            </MuiAlertTitle>}
            {snackValues.message}
          </MuiAlert>
        </Snackbar>
      </Box>
    )
  } else {
    return (
      <div>
        <Intro />
        <Snackbar open={snackValues.open}>
          <MuiAlert
            variant="filled"
            severity={snackValues.severity}
            sx={{ width: '100%' }}
          >
            {snackValues.authority && <MuiAlertTitle>
              {snackValues.authority} - {snackValues.procedure}
            </MuiAlertTitle>}
            {snackValues.message}
          </MuiAlert>
        </Snackbar>
      </div>
    )
  }
}

export default App