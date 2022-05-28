import styled from '@emotion/styled'
import { AppBar, Toolbar, Typography } from '@mui/material'
import { drawerWidth, drawerWidthSm } from '../Navbar/index'
import SearchComponent from './SearchComponent'
import { useState } from 'react'
import IconsBox from './IconsBox'

const MyStyledAppBar = styled(AppBar)(({ theme }) => ({
  paddingLeft: drawerWidth + 20,
  paddingRight: 20,
  [theme.breakpoints.down('md')]: {
    paddingLeft: drawerWidthSm + 20,
    paddingRight: 20
  }
}))

const MyTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'showSearch'
})(({ theme, showSearch }) => ({
  [theme.breakpoints.down('sm')]: {
    display: showSearch ? 'none' : 'show',
  }
}))

const MyAppBar = () => {
  const [showSearch, setShowSearch] = useState(false)

  return(
    <MyStyledAppBar position="fixed">
      <Toolbar
        disableGutters
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <MyTypography showSearch={showSearch} variant="subtitle1" noWrap component="div">
              Permanent drawer
        </MyTypography>
        <SearchComponent showSearch={showSearch} setShowSearch={setShowSearch} />
        <IconsBox showSearch={showSearch} setShowSearch={setShowSearch} />
      </Toolbar>
    </MyStyledAppBar>
  )
}

export default MyAppBar