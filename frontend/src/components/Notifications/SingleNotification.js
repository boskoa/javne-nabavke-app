import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import { Checkbox, Divider, IconButton } from '@mui/material'
import { useDispatch } from 'react-redux'
import { deleteNotification, updateNotificationsThunk } from '../../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

const MyStyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.custom.contrastText,
  marginRight: 20,
  marginBottom: 20,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: 300,
}))

const SingleNotification = ({ notification }) => {
  const dispatch = useDispatch()

  const link = notification.procedure ? `/procedures/${notification.procedure.id}` : ''

  const handleCheckbox = async (event) => {
    dispatch(updateNotificationsThunk({ id: notification.id, done: notification.done }))
    event.target.checked = notification.done
  }

  return (
    <MyStyledCard>
      <CardContent>
        <Link
          to={link}
          style={{ textDecoration: 'none' }}
        >
          <Typography sx={{ fontWeight: 'bold' }} variant="body2" color="text.secondary">
            {notification.procedure
              ? notification.procedure.name
              : 'Nije unet naziv postupka'}
          </Typography>
        </Link>
        <Divider sx={{ mb: 1.5, mt: 1.5 }} />
        <Typography variant="body2" color="text.secondary">
          {notification.text ? notification.text : <i>Nije uneta poruka</i>}
        </Typography>
        <Divider sx={{ mb: 1.5, mt: 1.5 }} />
        <Typography variant="body2" color="text.secondary">
          <span style={{ fontWeight: 600 }}>Alarm: </span>
          {notification.alarm ? notification.alarm.slice(0, 24) : <i>nije podešen</i>}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span style={{ fontWeight: 600 }}>UO: </span>{notification.procedure
            ? notification.procedure.contractingAuthority.name
            : <i>nije unet</i>}
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
    </MyStyledCard>
  )
}

export default SingleNotification