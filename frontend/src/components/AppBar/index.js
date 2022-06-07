import styled from '@emotion/styled'
import { AppBar, Toolbar } from '@mui/material'
import { drawerWidth, drawerWidthSm } from '../Navbar/index'
import SearchComponent from './SearchComponent'
import IconsBox from './IconsBox'
import { useState } from 'react'
import Location from './Location'

const MyStyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'black',
  color: theme.palette.secondary.contrastText,
  paddingLeft: drawerWidth + 20,
  paddingRight: 20,
  [theme.breakpoints.down('md')]: {
    paddingLeft: drawerWidthSm + 20,
    paddingRight: 20
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
        <Location showSearch={showSearch} />
        <SearchComponent showSearch={showSearch} setShowSearch={setShowSearch} />
        <IconsBox showSearch={showSearch} setShowSearch={setShowSearch} />
      </Toolbar>
    </MyStyledAppBar>
  )
}

export default MyAppBar