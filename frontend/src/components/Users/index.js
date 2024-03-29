import { useEffect } from 'react'
import { change } from '../../reducers/pathReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Stack } from '@mui/material'
import Loading from '../Loading'
import SingleUser from './SingleUser'

const Users = () => {
  const dispatch = useDispatch()
  const usersUnfiltered = useSelector((state) => state.users.data)
  const filter = useSelector(state => state.search.value.toLowerCase())
  const users = usersUnfiltered.filter((u) => u.name.toLowerCase().includes(filter))

  useEffect(() => {
    dispatch(change('Korisnici'))
  }, [])

  if (!users) {
    return <Loading />
  }

  return (
    <Stack sx={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {users.map((u) => <SingleUser key={u.id} user={u} />)}
    </Stack>
  )
}

export default Users