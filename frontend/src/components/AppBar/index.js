import styled from '@emotion/styled'
import { AppBar, Toolbar } from '@mui/material'
import SearchComponent from './SearchComponent'
import IconsBox from './IconBox'
import { useEffect, useState } from 'react'
import Location from './Location'
import { getAllOverviewThunk } from '../../reducers/userReducer'
import { initProcedures } from '../../reducers/procedureReducer'
import { useDispatch } from 'react-redux'

const MyStyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.custom.dark,
  color: theme.palette.secondary.contrastText,
  paddingLeft: 20,
  paddingRight: 20,
  [theme.breakpoints.down('md')]: {
    paddingLeft: 20,
    paddingRight: 20
  }
}))

const MyAppBar = () => {
  const [showSearch, setShowSearch] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    try {
      dispatch(getAllOverviewThunk())
      dispatch(initProcedures())
    } catch (error) {
      console.log(error)
    }
  }, [])

  return(
    <MyStyledAppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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