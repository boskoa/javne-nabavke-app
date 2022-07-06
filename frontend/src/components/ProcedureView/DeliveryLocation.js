import { FormControl, TextField } from '@mui/material'
import useInput from '../../hooks/useInput'
import { updateOneThunk } from '../../reducers/selectedProcedureReducer'

const DeliveryLocation = ({ procedure, userId }) => {
  const propertyName = 'deliveryLocation'
  const [
    location, setLocation, handleLocation
  ] = useInput(procedure.id, propertyName, procedure.deliveryLocation, updateOneThunk)

  return (
    <FormControl fullWidth>
      <TextField
        disabled={!(procedure.user.id === userId)}
        size="small"
        label="Mesto isporuke"
        id="deliveryLocation"
        sx={{ height: '2.5rem', fontSize: '0.8rem', mb: 1.5 }}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onBlur={handleLocation}
        InputLabelProps={{ shrink: true }}
      />
    </FormControl>
  )
}

export default DeliveryLocation