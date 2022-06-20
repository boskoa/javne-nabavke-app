import { useEffect } from 'react'
import { change } from '../../reducers/pathReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Stack } from '@mui/material'
import { getAllOverviewThunk } from '../../reducers/userReducer'
import Loading from '../Loading'
import SingleUser from './SingleUser'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.data)

  useEffect(() => {
    dispatch(change('Korisnici'))
    dispatch(getAllOverviewThunk())
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