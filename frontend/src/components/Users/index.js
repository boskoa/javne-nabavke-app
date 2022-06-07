import { useEffect } from 'react'
import { change } from '../../reducers/pathReducer'
import { useDispatch } from 'react-redux'

const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(change('Korisnici'))
  }, [])

  return (
    <div>
      Hello, User
    </div>
  )
}

export default Users