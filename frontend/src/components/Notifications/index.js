import { Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { change } from '../../reducers/pathReducer'
import FilterSwitch from '../HomePage/FilterSwitch'
import Loading from '../Loading'
import SingleNotification from './SingleNotification'

const Notifications = ({ notificationsUnfiltered }) => {
  const [notificationsFilter, setNotificationsFilter] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(change('Podsetnici'))
  }, [])

  if (!notificationsUnfiltered[0]) {
    return <Loading />
  }

  const notifications = notificationsFilter
    ? [ ...notificationsUnfiltered ]
      .filter((n) => !(n.done))
    : [ ...notificationsUnfiltered ]
      .sort((a, b) => (a.done === b.done) ? 0 : a.done ? 1 : -1)

  console.log('PROBA PODSETNICI', notifications)
  return (
    <Stack spacing={2}>
      <Stack direction="row" flexWrap="wrap">
        <FilterSwitch
          text="samo aktivni podsetnici"
          color="primary"
          setFilter={() => setNotificationsFilter(!notificationsFilter)}
        />
      </Stack>
      <Stack direction="row" flexWrap="wrap">
        {notifications.map((n) => <SingleNotification key={ n.id } notification={ n } />)}
      </Stack>
    </Stack>
  )
}

export default Notifications