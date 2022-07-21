import { Stack, Button, Divider } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { change } from '../../reducers/pathReducer'
import PersonalData from './PersonalData'
import { useParams, useNavigate } from 'react-router-dom'
import avatarServices from '../../services/avatar'
import useTimedSnack from '../../hooks/useTimedSnack'
import { updateOneUserThunk } from '../../reducers/userReducer'
import Loading from '../Loading'

const AccountSettings = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.users.data.find((u) => u.id === parseInt(id)))
  const activateSnack = useTimedSnack()
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.name) {
      dispatch(change(`Podešavanje naloga ${user.name}`))
    }
  }, [user])

  const handleRemoveAvatar = async () => {
    try {
      const response = await avatarServices.removeAvatar(parseInt(id))
      if (response.path === 'public/data/uploads/user_avatar') {
        activateSnack('success', 'Avatar je uklonjen')
        setTimeout(() => {
          window.location.reload(false)
          navigate('/')
        }, 3000)
      } else {
        activateSnack('error', 'Avatar nije uklonjen')
      }
    } catch (error) {
      activateSnack('error', error.response.data.error)
    }
  }

  const handleUserActivation = async () => {
    try {
      await dispatch(updateOneUserThunk({
        id, data: { disabled: !(user.disabled) }
      }))
      activateSnack(
        'success',
        `Status korisnika je promenjen u: ${user.disabled ? 'aktiviran' : 'deaktiviran'}`
      )
    } catch (error) {
      activateSnack('error', error.response.data.error)
    }
  }

  if (!user) {
    return <Loading />
  }

  return (
    <Stack>
      <PersonalData user={user} />
      <Divider />
      <Stack direction="row" justifyContent="space-between">
        <Button
          variant="contained"
          color="error"
          size="small"
          sx={{ alignSelf: 'center', textTransform: 'none', m: 1 }}
          onClick={handleRemoveAvatar}
        >Obriši avatar</Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          sx={{ alignSelf: 'center', textTransform: 'none', m: 1 }}
          onClick={handleUserActivation}
        >{user.disabled ? 'Aktiviraj korisnika' : 'Deaktiviraj korisnika'}</Button>
      </Stack>
    </Stack>
  )
}

export default AccountSettings