import { Box, Typography } from '@mui/material'
import CheckboxData from './CheckboxData'
import InputData from './InputData'

const OperationalData = ({ procedure, userId, isAdmin }) => {
  return (
    <Box elevation={0} sx={{ p: 1 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>Operativni podaci</Typography>
      <CheckboxData procedure={procedure} userId={userId} isAdmin={isAdmin} />
      <InputData procedure={procedure} userId={userId} isAdmin={isAdmin} />
    </Box>
  )
}

export default OperationalData