import { Stack } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { change } from '../../reducers/pathReducer'
import Loading from '../Loading'
import SingleNotification from './SingleNotification'

const Notifications = ({ notificationsUnfiltered }) => {
  const dispatch = useDispatch()

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
      {notifications.map((n) => <SingleNotification key={ n.id } notification={ n } />)}
    </Stack>
  )
}

export default Notifications