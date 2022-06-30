import { Avatar, Paper, Stack, Box, Typography } from '@mui/material'
import UserChart from './UserChart'

const SingleUser = ({ user }) => {
  const thisYear = new Date().getFullYear().toString()
  const procedures = user.procedures
    ? user.procedures.filter((p) => p.createdAt.slice(0,4) === thisYear)
    : []

  return (
    <Paper
      elevation={10}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        p: 1,
        backgroundColor: '#F5FFFA',
        mb: 3,
        mr: 3
      }}
    >
      <Stack sx={{ flexDirection: 'row' }}>
        <Avatar
          sx={{ backgroundColor: '#A0D995', height: '8rem', width: '8rem', mr: 3, mb: 3 }}
          src={`http://localhost:3003/${user.avatar}`}
        />
        <Stack sx={{ mt: 2 }}>
          <Typography variant="body2">Korisnik: {user.name}</Typography>
          <Typography variant="body2">ID: {user.id}</Typography>
          <Typography variant="body2">Korisničko ime: {user.username}</Typography>
          <Typography variant="body2">
            Postupaka u ovoj godini: {procedures.length}
          </Typography>
        </Stack>
      </Stack>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
          flexGrow: 1,
          flexShrink: 1,
          height: '10rem'
        }}
      >
        <UserChart procedures={user.procedures} />
      </Box>
    </Paper>
  )
}

export default SingleUser