import { Avatar, Paper, Stack } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { change } from '../../reducers/pathReducer'
import { getSelectedUserThunk } from '../../reducers/userReducer'
import Loading from '../Loading'
import ActiveProcedures from './ActiveProcedures'
import NotificationsBox from './NotificationsBox'
import SettingsButton from './SettingsButton'
import UserStats from './UserStats'

const UserView = () => {
  const { id } = useParams()
  const user = useSelector((state) => state.users.selectedUser)
  const adminLogged = useSelector((state) => state.login.data.admin)
  const pathUser = useSelector(
    (state) => state.users.data.find((u) => u.id === parseInt(id))
  )
  const avatar = `/${user.avatar}`
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(change(`Korisnik ${pathUser?.name}`))
    dispatch(getSelectedUserThunk(id))
  }, [])

  if (!user.id || !pathUser || !avatar) {
    return <Loading />
  }

  return (
    <Stack>
      <Paper
        elevation={3}
        sx={{
          p: 1, ml: 2, mb: 2, backgroundColor: 'custom.contrastText'
        }}
      >
        <Stack
          direction="row"
          sx={{ flexWrap: 'wrap' }}
          style={{ position: 'relative' }}
        >
          <Avatar
            sx={{
              backgroundColor: 'primary.main', height: '8rem', width: '8rem', mr:3
            }}
            src={avatar}
          />
          <UserStats user={user} />
          {adminLogged && <SettingsButton user={user} />}
        </Stack>
      </Paper>
      <Paper
        elevation={3}
        sx={{
          p: 1,
          ml: 2,
          mb: 2,
          backgroundColor: 'custom.contrastText',
          minWidth: '15rem'
        }}
      >
        <NotificationsBox notifications={user.notifications} />
      </Paper>
      <ActiveProcedures procedures={user.procedures} />
    </Stack>
  )
}

export default UserView
