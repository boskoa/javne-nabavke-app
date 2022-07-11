import { Stack, Typography } from '@mui/material'

const UserData = ({ user, procedures }) => {
  return (
    <Stack sx={{ mt: 2, mr: 1 }}>
      <Typography variant="body2">Korisnik: {user.name}</Typography>
      <Typography variant="body2">ID: {user.id}</Typography>
      <Typography variant="body2">Korisničko ime: {user.username}</Typography>
      <Typography variant="body2">
            Postupaka u ovoj godini: {procedures.length}
      </Typography>
    </Stack>
  )
}

export default UserData