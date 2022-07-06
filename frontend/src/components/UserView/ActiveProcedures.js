import { Paper, Stack, Typography } from '@mui/material'
import ActiveProcedure from './ActiveProcedure'

const ActiveProcedures = ({ procedures }) => {//dodati senku pri hoveru
  const sortedProcedures = procedures
    .map((p) => p.phase ? p : { ...p, phase: '00 Nije postavljeno' })
    .sort((a, b) => parseInt(a.phase.slice(0, 2)) > parseInt(b.phase.slice(0, 2)))
  console.log('NULIFIED', sortedProcedures)
  return (
    <Paper
      elevation={3}
      sx={{
        p: 1, ml: 2, mb: 2, backgroundColor: '#F5FFFA'
      }}
    >
      <Stack>
        <Typography variant="body1">Aktivni postupci</Typography>
        {sortedProcedures.map((p) => <ActiveProcedure key={p.id} procedure={p} />)}
      </Stack>
    </Paper>
  )
}

export default ActiveProcedures