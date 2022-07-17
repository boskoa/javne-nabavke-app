import { useDispatch } from 'react-redux'
import { removeSnack, sendSnack } from '../reducers/snackReducer'

const useTimedSnack = () => {
  const dispatch = useDispatch()

  const activateSnack = (severity, message) => {
    dispatch(sendSnack({
      open: true,
      severity,
      message
    }))
    setTimeout(() => dispatch(removeSnack()), 3000)
  }

  return activateSnack
}

export default useTimedSnack