import { FormGroup } from '@mui/material'
import Condition from './Condition'

const Conditions = ({ requirements, procedure, userId, isAdmin }) => {
  return (
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
          <Condition r={r} procedure={procedure} userId={userId} isAdmin={isAdmin} />
        </div>
      ))
      }
    </FormGroup>
  )
}

export default Conditions