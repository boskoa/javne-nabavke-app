import { Box, Stack, Typography } from '@mui/material'
import ChangeBasicDataModal from './ChangeBasicDataModal'

const BasicData = ({ procedure, userId, isAdmin }) => {
  return (
    <Box sx={{ p: 1 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1">Osnovni podaci</Typography>
        <ChangeBasicDataModal procedure={procedure} userId={userId} isAdmin={isAdmin} />
      </Stack>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
      }}>
        <Typography sx={{ padding: 1 }} variant="body2">
          Ugovorni organ: {procedure.contractingAuthority.name}
        </Typography>
        <Typography sx={{ padding: 1 }} variant="body2">
          Naziv: {procedure.name}
        </Typography>
        <Typography sx={{ padding: 1 }} variant="body2">
          Broj obaveštenja: {procedure.number}
        </Typography>
        <Typography sx={{ padding: 1 }} variant="body2">
          Korisnik: {procedure.user.name}
        </Typography>
      </Box>
    </Box>
  )
}

export default BasicData