import { Button, TextField } from '@mui/material'
import useNewCondition from '../../../hooks/useNewCondition'
import { addRequirement } from '../../../reducers/requirementReducer'

const NewCondition = ({ id, procedure, userId }) => {
  const [
    requirement, setRequirement, handleNewRequirement
  ] = useNewCondition(id, addRequirement)
  return (
    <form
      style={{
        display: 'flex',
        alignContent: 'center'
      }}
      onSubmit={handleNewRequirement}
    >
      <TextField
        disabled={!(procedure.user.id === userId)}
        id="condition"
        label="Novi uslov"
        value={requirement}
        variant="outlined"
        sx={{ m: 1 }}
        inputProps={{ maxLength: 30 }}
        size="small"
        onChange={(e) => setRequirement(e.target.value)}
      />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Button
          disabled={!(procedure.user.id === userId)}
          type='submit'
          variant="contained"
          size="small"
          sx={{ m: 1, alignSelf: 'center', textTransform: 'none' }}
        >
          Dodaj
        </Button>
      </div>
    </form>
  )
}

export default NewCondition