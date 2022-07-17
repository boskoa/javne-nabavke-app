import { useDispatch } from 'react-redux'
import { sendSnack } from '../reducers/snackReducer'

const useAutoSnack = () => {
  const dispatch = useDispatch()

  const activateSnack = (timer, severity, message, authority, procedure) => {
    setTimeout(() => dispatch(sendSnack({
      open: true,
      alarm: true,
      severity,
      message,
      authority,
      procedure
    })), timer)
  }

  return activateSnack
}

export default useAutoSnack