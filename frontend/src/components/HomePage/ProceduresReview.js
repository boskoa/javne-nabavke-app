import { Box } from '@mui/system'
import ProcedureCard from './ProcedureCard'

const ProceduresReview = ({ procedures }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      {procedures.map((p) => {
        return <ProcedureCard key={p.id} p={p} />
      })}
    </Box>
  )
}

export default ProceduresReview