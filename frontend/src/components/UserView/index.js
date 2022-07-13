import { Avatar, Paper, Stack } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { change } from '../../reducers/pathReducer'
import { getSelectedUserThunk } from '../../reducers/userReducer'
import Loading from '../Loading'
import ActiveProcedures from './ActiveProcedures'
import NotificationsBox from './NotificationsBox'
import UserStats from './UserStats'

const UserView = () => {
  const { id } = useParams()
  const user = useSelector((state) => state.users.selectedUser)
  const pathUser = useSelector(
    (state) => state.users.data.find((u) => u.id === parseInt(id))
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(change(`Korisnik ${pathUser.name}`))
    dispatch(getSelectedUserThunk(id))
  }, [])

  if (!user.id) {
    return <Loading />
  }
  console.log('USERVIEW', user)

  return (
    <Stack>
      <Paper
        elevation={3}
        sx={{
          p: 1, ml: 2, mb: 2, backgroundColor: '#F5FFFA'
        }}
      >
        <Stack direction="row" sx={{ flexWrap: 'wrap' }}>
          <Avatar
            sx={{
              backgroundColor: '#A0D995', height: '8rem', width: '8rem', mr:3
            }}
            src={user.avatar}
          />
          <UserStats user={user} />
        </Stack>
      </Paper>
      <Paper
        elevation={3}
        sx={{
          p: 1,
          ml: 2,
          mb: 2,
          backgroundColor: '#F5FFFA',
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
