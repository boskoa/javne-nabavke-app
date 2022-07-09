import { FormControl, TextField } from '@mui/material'
import useNotificationInput from '../../../hooks/useNotificationInput'
import { updateTextThunk } from '../../../reducers/notificationReducer'
import { changeNotificationText } from '../../../reducers/selectedProcedureReducer'

const NotificationText = ({ notifications, procedure, userId }) => {
  const propertyName = 'text'
  const [
    text, setText, handleText
  ] = useNotificationInput(
    notifications[0].id,
    propertyName,
    notifications[0].text,
    updateTextThunk,
    changeNotificationText
  )

  return (
    <FormControl fullWidth>
      <TextField
        disabled={!(procedure.user.id === userId)}
        multiline
        size="small"
        label="Tekst"
        id="notificationText"
        sx={{ fontSize: '0.8rem' }}
        value={text}
        onChange={(e) => {
          setText(e.target.value)
        }}
        onBlur={() => handleText()}
        InputLabelProps={{ shrink: true }}
        inputProps={{ maxLength: 300 }}
      />
    </FormControl>
  )
}

export default NotificationText