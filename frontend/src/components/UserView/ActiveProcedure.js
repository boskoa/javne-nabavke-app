import { Divider, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const ActiveProcedure = ({ procedure }) => {
  return (
    <Stack>
      <Link
        to={`/procedures/${procedure.id}`}
        style={{ color: 'black', textDecoration: 'none' }}
      >
        <Divider sx={{ mb: 1 }} />
        <Typography variant="body2">Postupak: {procedure.name}</Typography>
        <Typography variant="body2">UO: {procedure.contractingAuthority.name}</Typography>
        <Typography variant="body2">Rok za predaju: {procedure.submissionDate}</Typography>
        <Typography variant="body2">Faza: {procedure.phase}</Typography>
      </Link>
    </Stack>
  )
}

export default ActiveProcedure