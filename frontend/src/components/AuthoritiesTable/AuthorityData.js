import { Paper, Typography } from '@mui/material'

const AuthorityData = ({ authorityData }) => {
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'start',
        p: 1,
        flexGrow: 1,
        flexShrink: 1,
        margin: 1,
      }}
    >
      <Typography variant="h5" sx={{ margin: '0em auto 1em auto' }}>
        Osnovni podaci
      </Typography>
      <Typography>UO: {authorityData.authority}</Typography>
      <Typography>Broj postupaka: {authorityData.numOfProcedures}</Typography>
      <Typography>
        Uspešni postupci: {authorityData.numOfSuccesses}
      </Typography>
      <Typography>JIB: {authorityData.authorityJib}</Typography>
    </Paper>
  )
}

export default AuthorityData