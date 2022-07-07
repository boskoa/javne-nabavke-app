import { FormControl, TextField } from '@mui/material'
import useIntInput from '../../../../hooks/useIntInput'
import { updateOneThunk } from '../../../../reducers/selectedProcedureReducer'

const OfferValidity = ({ procedure, userId }) => {
  const propertyName = 'offerValidity'
  const [
    offerValidity, setOfferValidity, handleOfferValidity
  ] = useIntInput(procedure.id, propertyName, procedure.offerValidity, updateOneThunk)

  return (
    <FormControl fullWidth>
      <TextField
        disabled={!(procedure.user.id === userId)}
        size="small"
        label="Važenje ponude (u danima)"
        id="offerValidity"
        sx={{ height: '2.5rem', fontSize: '0.8rem', mb: 1.5 }}
        value={offerValidity}
        onChange={(e) => setOfferValidity(e.target.value)}
        onBlur={handleOfferValidity}
        InputLabelProps={{ shrink: true }}
      />
    </FormControl>
  )
}

export default OfferValidity