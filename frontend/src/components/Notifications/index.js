import { Stack } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { change } from '../../reducers/pathReducer'
import Loading from '../Loading'
import SingleNotification from './SingleNotification'

const Notifications = () => {
  const dispatch = useDispatch()
  const notificationsUnfiltered = useSelector((state) => state.notifications.data)

  useEffect(() => {
    dispatch(change('Podsetnici'))
  }, [])

  if (!notificationsUnfiltered[0]) {
    return <Loading />
  }

  const notifications = [ ...notificationsUnfiltered ].sort(
    (a, b) => (a.done === b.done) ? 0 : a.done ? 1 : -1
  )

  console.log('PROBA PODSETNICI', notifications)
  return (
    <Stack direction="row" flexWrap="wrap">
      {notifications.map((n) => <SingleNotification key={ n.text } notification={ n } />)}
    </Stack>
  )
}

export default Notifications