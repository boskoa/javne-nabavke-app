import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import Conditions from './Conditions'
import NewCondition from './NewCondition'

const QualificationConditions = ({ requirements, procedure, userId, id, isAdmin }) => {
  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="subtitle1">Kvalifikacioni uslovi</Typography>
      <Conditions
        requirements={requirements}
        procedure={procedure}
        userId={userId}
      />
      <NewCondition id={id} procedure={procedure} userId={userId} isAdmin={isAdmin} />
    </Box>
  )
}

export default QualificationConditions