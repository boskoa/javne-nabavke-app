import styled from '@emotion/styled'
import { Box, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import MyNotificationsIcon from './MyNotificationsIcon'
import MyPendingActions from './MyPendingActions'
import ProfileIcon from './ProfileIcon'
import { useSelector } from 'react-redux'

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
  const user = useSelector((state) => state.login.data)

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
      <ProfileIcon user={user} />
    </MyBox>
  )
}

export default IconsBox