import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { change } from '../../reducers/pathReducer'
import Loading from '../Loading'

const Notifications = () => {
  const dispatch = useDispatch()
  const notifications = useSelector((state) => state.notifications.data)

  useEffect(() => {
    dispatch(change('Podsetnici'))
  }, [])

  if (!notifications[0]) {
    return <Loading />
  }

  console.log('PROBA PODSETNICI', notifications)
  return (
    <div>
      {notifications.map((n) => <p key={ n.text }>{n.text}</p>)}
    </div>
  )
}

export default Notifications