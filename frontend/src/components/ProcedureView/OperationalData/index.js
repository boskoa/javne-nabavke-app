import { Box, Typography } from '@mui/material'
import CheckboxData from './OperationalData/CheckboxData'
import InputData from './InputData'

const OperationalData = ({ procedure, userId }) => {
  return (
    <Box elevation={0} sx={{ p: 1, background: '#F5FFFA' }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>Operativni podaci</Typography>
      <CheckboxData procedure={procedure} userId={userId} />
      <InputData procedure={procedure} userId={userId} />
    </Box>
  )
}

export default OperationalData