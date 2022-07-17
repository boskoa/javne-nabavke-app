import { Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { change } from '../../reducers/pathReducer'
import NotificationsFilter from './NotificationsFilter'
import SingleNotification from './SingleNotification'

const Notifications = () => {
  const notificationsUnfiltered = useSelector((state) => state.notifications.data)
  const [notificationsFilter, setNotificationsFilter] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(change('Podsetnici'))
  }, [])

  if (!notificationsUnfiltered[0]) {
    return <Typography variant="body2">Nema podsetnika</Typography>
  }

  const notifications = notificationsFilter
    ? [ ...notificationsUnfiltered ]
      .filter((n) => !(n.done))
    : [ ...notificationsUnfiltered ]
      .sort((a, b) => (a.done === b.done) ? 0 : a.done ? 1 : -1)

  return (
    <Stack spacing={2}>
      <NotificationsFilter
        notificationsFilter={notificationsFilter}
        setNotificationsFilter={setNotificationsFilter}
      />
      <Stack direction="row" flexWrap="wrap">
        {notifications.map((n) => <SingleNotification key={ n.id } notification={ n } />)}
      </Stack>
    </Stack>
  )
}

export default Notifications