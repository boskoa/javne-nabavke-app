import { Box } from '@mui/material'
import useAnalysis from '../../hooks/useAnalysis'
import analysis from '../../services/analysis'

const ProceduresByMonth = ({ start, end }) => {
  const result = useAnalysis(analysis.getProcsByMonth, start, end)
  console.log(result, start, end)
  return (
    <Box></Box>
  )
}

export default ProceduresByMonth