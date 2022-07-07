import { FormControl, TextField } from '@mui/material'
import useIntInput from '../../../../hooks/useIntInput'
import { updateOneThunk } from '../../../../reducers/selectedProcedureReducer'

const Payment = ({ procedure, userId }) => {
  const propertyName = 'payment'
  const [
    payment, setPayment, handlePayment
  ] = useIntInput(procedure.id, propertyName, procedure.payment, updateOneThunk)

  return (
    <FormControl fullWidth>
      <TextField
        disabled={!(procedure.user.id === userId)}
        size="small"
        label="Rok plaćanja (u danima)"
        id="payment"
        sx={{ height: '2.5rem', fontSize: '0.8rem', mb: 1.5 }}
        value={payment}
        onChange={(e) => setPayment(e.target.value)}
        onBlur={handlePayment}
        InputLabelProps={{ shrink: true }}
      />
    </FormControl>
  )
}

export default Payment