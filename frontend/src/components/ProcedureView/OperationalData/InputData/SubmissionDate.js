import { TextField } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { updateOneThunk } from '../../../../reducers/selectedProcedureReducer'
import useDateInput from '../../../../hooks/useDateInput'

const SubmissionDate = ({ procedure, userId }) => {
  const propertyName = 'submissionDate'
  const [
    submissionDate, setSubmissionDate, setFinalDate
  ] = useDateInput(procedure.id, propertyName, procedure.submissionDate, updateOneThunk)

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        disabled={!(procedure.user.id === userId)}
        fullWidth
        ampm={false}
        renderInput={(props) => <TextField {...props} />}
        label="Rok za predaju"
        id="deliveryDate"
        value={submissionDate}
        onChange={(newValue) => setSubmissionDate(newValue)}
        onAccept={() => setFinalDate(Math.floor(Math.random() * 100))}
        InputLabelProps={{ shrink: true }}
      />
    </LocalizationProvider>
  )
}

export default SubmissionDate