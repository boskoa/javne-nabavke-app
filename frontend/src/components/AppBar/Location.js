import { Typography } from '@mui/material'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'

const MyTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'showSearch'
})(({ theme, showSearch }) => ({
  height: '100%',
  backgroundColor: theme.palette.primary.dark,
  color: 'white',
  paddingLeft: 5,
  paddingRight: 5,
  borderRadius: 2,
  flexShrink: 0,
  [theme.breakpoints.down('sm')]: {
    display: showSearch ? 'none' : 'show',
  }
}))

const Location = ({ showSearch }) => {
  const path = useSelector(state => state.path.value)

  return (
    <MyTypography showSearch={showSearch} variant="subtitle1" noWrap component="div">
      {path}
    </MyTypography>
  )
}

export default Location