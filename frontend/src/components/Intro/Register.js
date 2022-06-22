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
import { removeSnack, sendSnack } from '../../reducers/snackReducer'

const Register = ({ open, handleClose }) => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRegister = async () => {
    if (!(username && password && name)) {
      dispatch(sendSnack({
        open: true,
        severity: 'error',
        message: 'Unesite odgovarajuće podatke'
      }))
      setTimeout(() => dispatch(removeSnack()), 3000)
    } else {
      console.log(username, name, password)
      try {
        await register({ username, name, password })
        navigate('/')
        handleClose()
        dispatch(sendSnack({
          open: true,
          severity: 'success',
          message: 'Uspešno ste se registrovali'
        }))
        setTimeout(() => dispatch(removeSnack()), 3000)
        dispatch(loginThunk({ username, password }))
      } catch (error) {
        console.log(error)
        dispatch(sendSnack({
          open: true,
          severity: 'error',
          message: `${error.response.data.error}`
        }))
        setTimeout(() => dispatch(removeSnack()), 3000)
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