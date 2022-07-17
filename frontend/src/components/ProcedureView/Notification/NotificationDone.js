import { Checkbox, FormControlLabel } from '@mui/material'
import useNotificationBooleanInput from '../../../hooks/useNotificationBooleanInput'
import { updateDoneThunk } from '../../../reducers/notificationReducer'

const NotificationDone = ({ notifications, procedure, userId, isAdmin }) => {
  const propertyName = 'done'
  const [
    notificationDone, handleNotificationDone
  ] = useNotificationBooleanInput(
    notifications[0].id, propertyName, notifications[0].done, updateDoneThunk
  )

  return (
    <FormControlLabel
      control={<Checkbox
        disabled={!(procedure.user.id === userId || isAdmin)}
        style={{ pointerEvents: 'auto' }}
        size="small"
        checked={notificationDone}
        onClick={handleNotificationDone}
      />}
      label="isključen"
    />
  )
}

export default NotificationDone