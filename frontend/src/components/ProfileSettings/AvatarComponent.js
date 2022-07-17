import { Stack, Input, Button, Paper, Typography } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateAvatar } from '../../reducers/loginReducer'
import avatarServices from '../../services/avatar'


const AvatarComponent = () => {
  const [name, setName] = useState('Odaberi avatar')
  const [file, setFile] = useState()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('file', file)
    const result = await avatarServices.uploadAvatar(formData)
    dispatch(updateAvatar(result))
    const loggedUserJSON = window.localStorage.getItem('loggedTenderUser')
    const user = JSON.parse(loggedUserJSON)
    user.avatar = result.path
    window.localStorage.setItem('loggedTenderUser', JSON.stringify(user))
  }

  return (
    <Paper sx={{ mb: 2, padding: 2 }}>
      <Stack>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Podesi avatar
        </Typography>
        <form id="avatar-form" encType="multipart/form-data">
          <label htmlFor="avatar">
            <Input
              sx={{ display: 'none' }}
              id="avatar"
              type="file"
              name="avatar"
              onChange={(e) => {
                const valueArray = e.target.value.split('\\')
                setName(valueArray[valueArray.length - 1])
                setFile(e.target.files[0])
              }}
            />
            <Button
              variant="contained"
              component="span"
              size="small"
              sx={{ textTransform: 'none' }}
            >
              {name}
            </Button>
          </label>
          <Button
            type="submit"
            variant="contained"
            component="span"
            size="small"
            sx={{ textTransform: 'none', ml: 3 }}
            onClick={(e) => handleSubmit(e)}
          >
          Postavi
          </Button>
        </form>
      </Stack>
    </Paper>
  )
}

export default AvatarComponent