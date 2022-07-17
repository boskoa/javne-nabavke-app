import { Stack } from '@mui/material'
import { MyChip } from '../AppBar/Location'
import FilterSwitch from '../HomePage/FilterSwitch'

const NotificationsFilter = ({ notificationsFilter, setNotificationsFilter }) => {
  return (
    <Stack alignItems="start" direction="row" justifyContent="flex-start">
      <MyChip
        label={
          <FilterSwitch
            text="samo aktivni podsetnici"
            color="primary"
            setFilter={() => setNotificationsFilter(!notificationsFilter)}
          />
        }
        color="chips"
      />
    </Stack>
  )
}

export default NotificationsFilter