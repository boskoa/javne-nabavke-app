import { IconButton, Badge, ClickAwayListener, Menu, MenuItem, Divider } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const MyNotificationsIcon = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const notifications = useSelector((state) => state.notifications.data)

  if (!notifications) {
    return <div />
  }

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
      <Menu
        id="notifications-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>Podsetnici</MenuItem>
        <Divider />
        {activeNotifications.map((n) => {
          return (
            <MenuItem onClick={handleClose} key={n.id}>
              <Link to="/notifications" style={{ textDecoration: 'none', color: 'black' }}>
                {`${
                  n.alarm?.slice(4, 21)
                } - ${
                  n.procedure?.contractingAuthority.name
                } - ${
                  n.procedure?.name
                }
                `}
              </Link>
            </MenuItem>
          )
        }
        )}
      </Menu>
    </IconButton>
  )
}

export default MyNotificationsIcon