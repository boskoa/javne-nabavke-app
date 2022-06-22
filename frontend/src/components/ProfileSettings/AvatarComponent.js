import { Stack, Input, Button } from '@mui/material'
import { useState } from 'react'


const AvatarComponent = () => {
  const [name, setName] = useState('Odaberi avatar')
  const [file, setFile] = useState()
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('file', file)
    console.log('MULTER', formData)// ne može pokazati u brauzeru
  }

  return (
    <Stack>
      <form id="avatar-form" encType="multipart/form-data">
        <label htmlFor="avatar">
          <Input
            sx={{ display: 'none' }}
            id="avatar"
            type="file"
            name="avatar"
            onChange={(e) => {
              setName(e.target.value)
              setFile(e.target.files[0])
            }}
          />
          <Button
            variant="contained"
            component="span"
            sx={{ textTransform: 'none' }}
          >
            {name}
          </Button>
        </label>
        <Button
          type="submit"
          variant="contained"
          component="span"
          sx={{ textTransform: 'none', ml: 3 }}
          onClick={(e) => handleSubmit(e)}
        >
          Postavi
        </Button>
      </form>
    </Stack>
  )
}

export default AvatarComponent