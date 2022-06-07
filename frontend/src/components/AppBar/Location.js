import { Typography } from '@mui/material'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'

const MyTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'showSearch'
})(({ theme, showSearch }) => ({
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