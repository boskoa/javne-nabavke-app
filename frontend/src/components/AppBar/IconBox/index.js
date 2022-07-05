import styled from '@emotion/styled'
import { Box, IconButton, Avatar, Divider } from '@mui/material'
//import AccountCircle from '@mui/icons-material/AccountCircle'
import SearchIcon from '@mui/icons-material/Search'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../reducers/loginReducer'
import { Link, useNavigate } from 'react-router-dom'
import { ClickAwayListener } from '@mui/base'
import Loading from '../../Loading'
import MyNotificationsIcon from './MyNotificationsIcon'
import MyPendingActions from './MyPendingActions'

const MyBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'showSearch'
})(({ theme, showSearch }) => ({
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    display: showSearch ? 'none' : 'flex',
  }
}))

const SearchIconButton = styled(IconButton)(({ theme, showSearch }) => ({
  [theme.breakpoints.up('sm')]: {
    display: showSearch ? 'flex' : 'none',
  }
}))

const IconsBox = ({ showSearch, setShowSearch }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const user = useSelector((state) => state.login.data)
  console.log('VAHA JUZER', user)

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
    <MyBox showSearch={showSearch}>
      <SearchIconButton
        size="small"
        color="inherit"
        sx={{ mr: 1 }}
        onClick={() => setShowSearch(true)}
      >
        <SearchIcon />
      </SearchIconButton>
      <MyPendingActions user={user} />
      <MyNotificationsIcon />
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
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem>{user.name}</MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>Profil</MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}>Podešavanja</Link>
          </MenuItem>
          <MenuItem onClick={handleLogout}>Odjavi se</MenuItem>
        </Menu>
      </IconButton>
    </MyBox>
  )
}

export default IconsBox