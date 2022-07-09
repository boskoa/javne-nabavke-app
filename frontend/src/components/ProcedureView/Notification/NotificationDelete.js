import { FormControlLabel, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch } from 'react-redux'
import { deleteNotification } from '../../../reducers/notificationReducer'
import { removeNotifications } from '../../../reducers/selectedProcedureReducer'

const NotificationDelete = ({ notifications, procedure, userId }) => {
  const dispatch = useDispatch()

  return (
    <FormControlLabel label="obriši" control={
      <IconButton
        disabled={!(procedure.user.id === userId)}
        style={{
          pointerEvents: 'auto',
          paddingLeft: '0.5rem',
          paddingRight: '0.6rem'
        }}
        size="small"
        onClick={() => {
          dispatch(deleteNotification(notifications[0].id))
          dispatch(removeNotifications())
        }}
      >
        <CloseIcon fontSize="small" sx={{ p: 0, height: '1.6rem' }} />
      </IconButton>
    }/>
  )
}

export default NotificationDelete