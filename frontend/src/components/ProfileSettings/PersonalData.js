import { Stack } from '@mui/material'
import Name from './Name'
import Password from './Password'
import Username from './Username'

const PersonalData = () => {
  return (
    <Stack>
      <Name />
      <Username />
      <Password />
    </Stack>
  )
}

export default PersonalData