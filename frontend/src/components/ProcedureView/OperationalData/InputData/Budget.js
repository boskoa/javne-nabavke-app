import { FormControl, TextField } from '@mui/material'
import useCurrencyInput from '../../../../hooks/useCurrencyInput'
import { updateOneThunk } from '../../../../reducers/selectedProcedureReducer'

const Budget = ({ procedure, userId, isAdmin }) => {
  const propertyName = 'budget'
  const [
    budget, setBudget, handleBudget
  ] = useCurrencyInput(procedure.id, propertyName, procedure.budget, updateOneThunk)

  return (
    <FormControl fullWidth>
      <TextField
        disabled={!(procedure.user.id === userId || isAdmin)}
        size="small"
        label="Budžet"
        id="budget"
        sx={{ height: '2.5rem', fontSize: '0.8rem', mb: 1.5,mt: 4 }}
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        onBlur={handleBudget}
        InputLabelProps={{ shrink: true }}
      />
    </FormControl>
  )
}

export default Budget