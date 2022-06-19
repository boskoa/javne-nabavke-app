import { Stack } from '@mui/material'
import ProcedureCard from './ProcedureCard'

const ProceduresReview = ({ procedures }) => {
  return (
    <Stack direction="row" sx={{ flexWrap: 'wrap' }}>
      {procedures.map((p) => {
        return (
          <ProcedureCard key={p.id} p={p} />
        )
      })}
    </Stack>
  )
}

export default ProceduresReview