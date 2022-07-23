import { IconButton, Badge, ClickAwayListener, MenuItem, Divider, Typography } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MyMenu } from './ProfileIcon'
import useAutoSnack from '../../../hooks/useAutoSnack'

const options = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
}

const MyNotificationsIcon = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const activateSnack = useAutoSnack()

  const notifications = useSelector((state) => state.notifications.data)

  useEffect(() => {
    if (notifications && notifications.length) {
      const alarmedNotifications = notifications instanceof Array
        ? notifications.filter((n) => n.alarm && !(n.done))
        : []
      for (let i = 0; i < alarmedNotifications.length; i++) {
        const deadline = new Date(alarmedNotifications[i].alarm).getTime()
        const now = new Date().getTime()
        const timer = deadline > now ? deadline - now : i * 20000
        activateSnack(
          timer,
          'warning',
          alarmedNotifications[i].text,
          alarmedNotifications[i].procedure.contractingAuthority.name,
          alarmedNotifications[i].procedure.name
        )
      }
    }
  }, [notifications])

  if (!notifications || !(notifications instanceof Array)) {
    return <div />
  }

  const activeNotifications = notifications.length
    ? notifications.filter((n) => !(n.done))
    : []

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <IconButton
      size="small"
      color="inherit"
      sx={{ mr: 1 }}
      onClick={handleClick}
    >
      <ClickAwayListener onClickAway={handleClose}>
        <Badge max={99} badgeContent={activeNotifications?.length} color="error">
          <NotificationsIcon />
        </Badge>
      </ClickAwayListener>
      <MyMenu
        id="notifications-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem disabled>
          <Typography variant="body2" sx={{ color: 'black' }}>Podsetnici</Typography>
        </MenuItem>
        <Divider />
        {activeNotifications.map((n) => {
          return (
            <MenuItem onClick={handleClose} key={n.id}>
              <Link to="/notifications" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" sx={{ color: 'custom.contrastText' }}>
                  {`${
                    n?.alarm && new Date(n.alarm)
                      .toLocaleDateString('sr-Latn-RS', options)
                  } - ${
                    n.procedure?.contractingAuthority.name
                  } - ${
                    n.procedure?.name
                  }
                `}
                </Typography>
              </Link>
            </MenuItem>
          )
        }
        )}
      </MyMenu>
    </IconButton>
  )
}

export default MyNotificationsIcon