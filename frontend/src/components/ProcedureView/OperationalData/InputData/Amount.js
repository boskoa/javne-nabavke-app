import { FormControl, TextField } from '@mui/material'
import useCurrencyInput from '../../../../hooks/useCurrencyInput'
import { updateOneThunk } from '../../../../reducers/selectedProcedureReducer'

const Amount = ({ procedure, userId, isAdmin }) => {
  const propertyName = 'amount'
  const [
    amount, setAmount, handleAmount
  ] = useCurrencyInput(procedure.id, propertyName, procedure.amount, updateOneThunk)

  return (
    <FormControl fullWidth>
      <TextField
        disabled={!(procedure.user.id === userId || isAdmin)}
        size="small"
        label="Vrednost ponude"
        id="amount"
        sx={{ height: '2.5rem', fontSize: '0.8rem', mb: 1.5 }}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        onBlur={handleAmount}
        InputLabelProps={{ shrink: true }}
      />
    </FormControl>
  )
}

export default Amount