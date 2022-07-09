import { Box, Typography } from '@mui/material'

const BasicData = ({ procedure }) => {
  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>Osnovni podaci</Typography>
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