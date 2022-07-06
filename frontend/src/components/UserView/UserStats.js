import { Stack, Typography } from '@mui/material'

const UserStats = ({ user }) => {
  return (
    <Stack sx={{ mt: 2 }}>
      <Typography variant="body2">Korisnik: {user.name}</Typography>
      <Typography variant="body2">ID: {user.id}</Typography>
      <Typography variant="body2">Korisničko ime: {user.username}</Typography>
      <Typography variant="body2">
            Postupaka u ovoj godini: {user.procedures.length}
      </Typography>
    </Stack>
  )
}

export default UserStats