import { TextField } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import useAlarmInput from '../../../hooks/useAlarmInput'
import { updateAlarmThunk } from '../../../reducers/notificationReducer'

const Alarm = ({ notifications, procedure, userId }) => {
  const propertyName = 'alarm'
  const [
    alarm, setAlarm, setFinalAlarm
  ] = useAlarmInput(
    notifications[0].id,
    propertyName,
    notifications[0].alarm,
    updateAlarmThunk
  )

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        disabled={!(procedure.user.id === userId)}
        fullWidth
        ampm={false}
        renderInput={(props) => <TextField {...props} />}
        label="Alarm"
        id="alarm"
        value={alarm}
        onChange={(newValue) => setAlarm(newValue)}
        onAccept={() => setFinalAlarm(Math.floor(Math.random() * 100))}
        InputLabelProps={{ shrink: true }}
      />
    </LocalizationProvider>
  )
}

export default Alarm