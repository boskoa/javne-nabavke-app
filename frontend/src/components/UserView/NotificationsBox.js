import { Divider, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import Loading from '../Loading'

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
            <Divider sx={{ mb: 1 }} />
            <Typography variant="body2">{n.text}</Typography>
            <Typography variant="body2">
              Alarm: {n.alarm ? n.alarm.slice(0, 24) : 'nije podešen'}
            </Typography>
          </Link>
        )
      })}
    </div>
  )
}

export default NotificationsBox