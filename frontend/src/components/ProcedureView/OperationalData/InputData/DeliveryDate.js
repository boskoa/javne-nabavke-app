import { FormControl, TextField } from '@mui/material'
import useIntInput from '../../../../hooks/useIntInput'
import { updateOneThunk } from '../../../../reducers/selectedProcedureReducer'

const DeliveryDate = ({ procedure, userId, isAdmin }) => {
  const propertyName = 'deliveryDate'
  const [
    deliveryDate, setDeliveryDate, handleDeliveryDate
  ] = useIntInput(procedure.id, propertyName, procedure.deliveryDate, updateOneThunk)

  return (
    <FormControl fullWidth>
      <TextField
        disabled={!(procedure.user.id === userId || isAdmin)}
        size="small"
        label="Rok isporuke (u danima)"
        id="deliveryDate"
        sx={{ height: '2.5rem', fontSize: '0.8rem', mb: 1.5 }}
        value={deliveryDate}
        onChange={(e) => setDeliveryDate(e.target.value)}
        onBlur={handleDeliveryDate}
        InputLabelProps={{ shrink: true }}
      />
    </FormControl>
  )
}

export default DeliveryDate