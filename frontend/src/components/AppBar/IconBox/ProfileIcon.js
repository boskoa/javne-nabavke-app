import { IconButton, Avatar, Divider, Typography } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../../reducers/loginReducer'
import { Link, useNavigate } from 'react-router-dom'
import { ClickAwayListener } from '@mui/base'
import Loading from '../../Loading'
import styled from '@emotion/styled'

export const MyMenu = styled(Menu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    backgroundColor: theme.palette.custom.main,
  },
}))

const ProfileIcon = ({ user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const avatar = user.avatar

  if (!avatar) {
    <Loading />
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    setAnchorEl(null)
    dispatch(logout())
    window.localStorage.clear()
    console.log(window.localStorage)
    navigate('/')
  }

  return (
    <IconButton
      size="small"
      color="inherit"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
    >
      <ClickAwayListener onClickAway={handleClose}>
        <Avatar
          src={`http://localhost:3003/${avatar}`}
          sx={{ height: '1.7rem', width: '1.7rem' }}
        />
      </ClickAwayListener>
      <MyMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem disabled>
          <Typography variant="body2" sx={{ color: 'black' }}>
            {user.name}
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <Link
            to={`/userview/${user.id}`}
            style={{ textDecoration: 'none' }}
          >
            <Typography variant="body2" sx={{ color: 'custom.contrastText' }}>
              Profil
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/profile" style={{ textDecoration: 'none' }}>
            <Typography variant="body2" sx={{ color: 'custom.contrastText' }}>
              Podešavanja
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography variant="body2" sx={{ color: 'custom.contrastText' }}>
            Odjavi se
          </Typography>
        </MenuItem>
      </MyMenu>
    </IconButton>
  )
}

export default ProfileIcon