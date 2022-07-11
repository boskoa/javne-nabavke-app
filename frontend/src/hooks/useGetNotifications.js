import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllNotificationsThunk } from '../reducers/notificationReducer'
// verovatno za brisanje, ceo fajl
const useGetNotifications = () => {
  const login = useSelector((state) => state.login.data)
  const notifications = useSelector((state) => state.notifications.data)
  const [authorization, setAuthorization] = useState('')
  const dispatch = useDispatch()

  const auth = 'bearer '

  console.log('JUZ GET NOTIF', login, authorization)

  useEffect(() => {
    if (login.token.length) {
      setAuthorization(auth)
      console.log('1 AUTHORIZATION SET THIS', authorization, login, auth)
    }
  }, [login])

  const getNotifications = () => {
    if (authorization) {
      console.log('3 AUTHORIZATION CHANGED THIS', authorization)
      dispatch(getAllNotificationsThunk(authorization))
    }
  }

  return [
    notifications,
    getNotifications
  ]
}

export default useGetNotifications