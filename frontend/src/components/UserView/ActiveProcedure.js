import { Divider, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const ActiveProcedure = ({ procedure }) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }
  const date = procedure.submissionDate
    ? new Date(procedure.submissionDate).toLocaleDateString('sr-Latn-RS', options)
    : 'nije podešen'

  return (
    <Stack>
      <Link
        to={`/procedures/${procedure.id}`}
        style={{ color: 'black', textDecoration: 'none' }}
      >
        <Divider sx={{ mb: 1, mt: 1 }} />
        <Typography variant="body2">Postupak: {procedure.name}</Typography>
        <Typography variant="body2">UO: {procedure.contractingAuthority.name}</Typography>
        <Typography variant="body2">Rok za predaju: {date}</Typography>
        <Typography variant="body2">Faza: {procedure.phase}</Typography>
      </Link>
    </Stack>
  )
}

export default ActiveProcedure