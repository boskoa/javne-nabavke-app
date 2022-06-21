import { Chip, /*Typography*/ } from '@mui/material'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'

const MyChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'showSearch'
})(({ theme, showSearch }) => ({
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
      color="primary"
    />
  )
}

export default Location