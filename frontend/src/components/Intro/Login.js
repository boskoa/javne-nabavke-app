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
import notificationService from '../../services/notifications'
import avatarService from '../../services/avatar'
import procedureService from '../../services/procedures'
import userService from '../../services/users'
import authorityService from '../../services/authorities'
import requirementService from '../../services/requirements'
import analysisService from '../../services/analysis'
import useTimedSnack from '../../hooks/useTimedSnack'

const Login = ({ open, handleClose }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const activateSnack = useTimedSnack()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!(username && password)) {
      activateSnack('error', 'Unesite odgovarajuće podatke')
    } else {
      const result = await dispatch(loginThunk({ username, password }))
      setUsername('')
      setPassword('')
      handleClose()
      navigate('/')
      if (result?.payload?.error) {
        activateSnack('error', result.payload.error)
      } else {
        notificationService.setToken(result.payload.token)
        avatarService.setToken(result.payload.token)
        procedureService.setToken(result.payload.token)
        userService.setToken(result.payload.token)
        authorityService.setToken(result.payload.token)
        requirementService.setToken(result.payload.token)
        analysisService.setToken(result.payload.token)
        activateSnack('success', 'Uspešno ste se ulogovali')
      }
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