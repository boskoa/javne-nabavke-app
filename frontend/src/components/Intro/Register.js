import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import register from '../../services/register'
import { loginThunk } from '../../reducers/loginReducer'
import { useNavigate } from 'react-router-dom'
import useTimedSnack from '../../hooks/useTimedSnack'

const Register = ({ open, handleClose }) => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const activateSnack = useTimedSnack()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRegister = async () => {
    if (!(username && password && name)) {
      activateSnack('error', 'Unesite odgovarajuće podatke')
    } else {
      console.log(username, name, password)
      try {
        await register({ username, name, password })
        navigate('/')
        handleClose()
        activateSnack('success', 'Uspešno ste se registrovali. Možete se prijaviti.')
        dispatch(loginThunk({ username, password }))
      } catch (error) {
        activateSnack('error', error.response.data.error)
      }
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Registruj se</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="korisničko ime"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="ime"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="password"
            label="lozinka"
            type="password"
            fullWidth
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Poništi</Button>
          <Button onClick={handleRegister}>Pošalji</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Register