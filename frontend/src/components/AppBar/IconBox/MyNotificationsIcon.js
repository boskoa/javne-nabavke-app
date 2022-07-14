import { IconButton, Badge, ClickAwayListener, MenuItem, Divider, Typography } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MyMenu } from './ProfileIcon'
import { sendSnack } from '../../../reducers/snackReducer'
import { getAllNotificationsThunk } from '../../../reducers/notificationReducer'

const MyNotificationsIcon = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const notifications = useSelector((state) => state.notifications.data)
  const login = useSelector((state) => state.login.data)
  const dispatch = useDispatch()

  useEffect(() => {
    if (login?.token) {
      dispatch(getAllNotificationsThunk())
    }
  }, [login])

  useEffect(() => {
    if (notifications.length) {
      const alarmedNotifications = notifications
        ? notifications.filter((n) => n.alarm && !(n.done))
        : []
      for (let i = 0; i < alarmedNotifications.length; i++) {
        const deadline = new Date(alarmedNotifications[i].alarm).getTime()
        const now = new Date().getTime()
        const timer = deadline > now ? deadline - now : i * 20000
        setTimeout(() => dispatch(sendSnack({
          open: true,
          alarm: true,
          severity: 'warning',
          message: alarmedNotifications[i].text,
          authority: alarmedNotifications[i].procedure.contractingAuthority.name,
          procedure: alarmedNotifications[i].procedure.name
        })), timer)
      }
    }
  }, [notifications])

  const activeNotifications = notifications.filter((n) => !(n.done))

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
        <Badge max={99} badgeContent={activeNotifications.length} color="error">
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
                    n.alarm?.slice(4, 21)
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