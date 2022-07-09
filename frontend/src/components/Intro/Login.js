import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginThunk } from '../../reducers/loginReducer'
import { useNavigate } from 'react-router-dom'
import { removeSnack, sendSnack } from '../../reducers/snackReducer'

const Login = ({ open, handleClose }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!(username && password)) {
      dispatch(sendSnack({
        open: true,
        severity: 'error',
        message: 'Unesite odgovarajuće podatke'
      }))
      setTimeout(() => dispatch(removeSnack()), 3000)
    } else {
      const result = await dispatch(loginThunk({ username, password }))
      setUsername('')
      setPassword('')
      handleClose()
      navigate('/')
      if (result.payload.error) {
        dispatch(sendSnack({
          open: true,
          severity: 'error',
          message: `${result.payload.error}`
        }))
        setTimeout(() => dispatch(removeSnack()), 3000)
      } else {
        dispatch(sendSnack({
          open: true,
          severity: 'success',
          message: 'Uspešno ste se ulogovali'
        }))
        setTimeout(() => dispatch(removeSnack()), 3000)
      }
      //token podesiti u uslugama (let token itd), napraviti funkciju za formatiranje tokena ('bearer ...')
      //i dodavati ga kao config objekat u axios parametre tamo gde je potrebna autorizacija --> config={headers: {Authorization: token}}
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Prijavi se</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="username"
            label="korisničko ime"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            required
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
          <Button onClick={handleLogin}>Pošalji</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Login