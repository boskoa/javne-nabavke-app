import { FormGroup, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Condition from './Condition'
import NewCondition from './NewCondition'

const QualificationConditions = ({ requirements, procedure, userId, id }) => {
  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="subtitle1">Kvalifikacioni uslovi</Typography>
      <FormGroup sx={{
        m: 1,
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        maxHeight: '40vh'
      }}>
        {requirements.map((r) => (
          <div
            style={{
              display: 'flex',
              displayWrap: 'wrap',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginRight: 20
            }}
            key={r.id}
          >
            <Condition r={r} procedure={procedure} userId={userId} />
          </div>
        ))
        }
      </FormGroup>
      <NewCondition id={id} procedure={procedure} userId={userId} />
    </Box>
  )
}

export default QualificationConditions