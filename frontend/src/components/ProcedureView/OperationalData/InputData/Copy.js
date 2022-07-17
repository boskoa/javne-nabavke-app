import { FormControl, TextField } from '@mui/material'
import useIntInput from '../../../../hooks/useIntInput'
import { updateOneThunk } from '../../../../reducers/selectedProcedureReducer'

const Copy = ({ procedure, userId, isAdmin }) => {
  const propertyName = 'copy'
  const [
    copy, setCopy, handleCopy
  ] = useIntInput(procedure.id, propertyName, procedure.copy, updateOneThunk)

  return (
    <FormControl fullWidth>
      <TextField
        disabled={!(procedure.user.id === userId || isAdmin)}
        size="small"
        label="Broj kopija ponude"
        id="copy"
        sx={{ height: '2.5rem', fontSize: '0.8rem', mb: 1.5 }}
        value={copy}
        onChange={(e) => setCopy(e.target.value)}
        onBlur={handleCopy}
        InputLabelProps={{ shrink: true }}
      />
    </FormControl>
  )
}

export default Copy