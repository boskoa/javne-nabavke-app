import { Stack } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { change } from '../../reducers/pathReducer'
import AvatarComponent from './AvatarComponent'

const ProfileSettings = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login.data)

  useEffect(() => {
    dispatch(change('Podešavanje profila'))
  }, [])

  return (
    <Stack>
      {user.name}
      <AvatarComponent />
    </Stack>
  )
}

export default ProfileSettings