import { Divider, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import Loading from '../Loading'

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
}

const NotificationsBox = ({ notifications }) => {
  const activeNotifications = notifications.filter((n) => !(n.done))

  if (!activeNotifications) {
    return <Loading />
  }

  return (
    <div>
      <Typography variant="body1">Aktivni podsetnici</Typography>
      {activeNotifications.map((n) => {
        return (
          <Link
            to="/notifications"
            style={{ marginTop: '0.5rem', textDecoration: 'none', color: 'black' }}
            key={n.id}
          >
            <Divider sx={{ mb: 1, mt: 1 }} />
            <Typography variant="body2">{n.text}</Typography>
            <Typography variant="body2">
              Alarm: {n.alarm
                ? new Date(n.alarm).toLocaleDateString('sr-Latn-RS', options)
                : 'nije podešen'}
            </Typography>
          </Link>
        )
      })}
    </div>
  )
}

export default NotificationsBox