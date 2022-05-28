import styled from '@emotion/styled'
import { Box, IconButton, Badge } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import ConstructionIcon from '@mui/icons-material/Construction'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SearchIcon from '@mui/icons-material/Search'

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
      <IconButton size="small" color="inherit" sx={{ mr: 1 }}>
        <Badge badgeContent={4} color="error">
          <ConstructionIcon />
        </Badge>
      </IconButton>
      <IconButton
        size="small"
        color="inherit"
        sx={{ mr: 1 }}
      >
        <Badge badgeContent={7} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <IconButton
        size="small"
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
    </MyBox>
  )
}

export default IconsBox