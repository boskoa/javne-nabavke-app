import { Chip, /*Typography*/ } from '@mui/material'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'

export const MyChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'showSearch'
})(({ theme, showSearch }) => ({
  marginRight: 5,
  borderRadius: 5,
  color: theme.palette.custom.light,
  borderColor: theme.palette.custom.light,
  [theme.breakpoints.down('sm')]: {
    display: showSearch ? 'none' : 'show',
  }
}))

const Location = ({ showSearch }) => {
  const path = useSelector(state => state.path.value)

  return (
    <MyChip
      showSearch={showSearch}
      label={path}
      variant="outlined"
    />
  )
}

export default Location