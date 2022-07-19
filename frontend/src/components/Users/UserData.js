import { Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const UserData = ({ user, procedures }) => {
  return (
    <Stack sx={{ mt: 2, mr: 1 }}>
      <Typography variant="body2">
        Korisnik:
        <Link
          to={`/userview/${user.id}`}
          style={{ color: 'inherit', textDecoration: 'none' }}
        > {user.name}</Link>
      </Typography>
      <Typography variant="body2">ID: {user.id}</Typography>
      <Typography variant="body2">Korisničko ime: {user.username}</Typography>
      <Typography variant="body2">
        Postupaka u ovoj godini: {procedures.length}
      </Typography>
    </Stack>
  )
}

export default UserData