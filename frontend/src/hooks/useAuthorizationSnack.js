import { useDispatch } from 'react-redux'
import { removeSnack, sendSnack } from '../reducers/snackReducer'

const useAuthorizationSnack = (condition) => {
  const dispatch = useDispatch

  const activateSnack = () => {
    if (condition) {
      dispatch(sendSnack({
        open: true,
        severity: 'error',
        message: 'Samo osoba kojoj je dodeljen postupak i administrator mogu menjati podatke.'
      }))
      setTimeout(() => dispatch(removeSnack()), 3000)
    }
  }

  return [activateSnack]
}

export default useAuthorizationSnack