import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import { Checkbox, IconButton } from '@mui/material'
import { useDispatch } from 'react-redux'
import { deleteNotification, updateNotificationsThunk } from '../../reducers/notificationReducer'

const SingleNotification = ({ notification }) => {
  const dispatch = useDispatch()

  const handleCheckbox = async (event) => {
    dispatch(updateNotificationsThunk({ id: notification.id, done: notification.done }))
    event.target.checked = notification.done
  }

  return (
    <Card sx={{ width: 300, mr: 2, mb: 2, backgroundColor: '#F5FFFA' }}>
      <CardContent>
        <Typography sx={{ fontWeight: 'bold' }} variant="body2" color="text.secondary">
          {notification.procedure && notification.procedure.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {notification.text}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {notification.alarm}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {notification.procedure && notification.procedure.contractingAuthority.name}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton
          onClick={async () => {
            dispatch(deleteNotification(parseInt(notification.id)))
          }}
        >
          <CloseIcon
            fontSize="small" sx={{ p: 0, height: '1.2rem' }}
          />
        </IconButton>
        <Checkbox
          style={{ pointerEvents: 'auto' }}
          size="small"
          checked={notification.done}
          value={notification.id}
          onClick={(event) => handleCheckbox(event)}
        />
      </CardActions>
    </Card>
  )
}

export default SingleNotification