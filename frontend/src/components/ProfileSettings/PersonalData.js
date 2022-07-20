import { Button, Paper, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import useTimedSnack from '../../hooks/useTimedSnack'
import { logout } from '../../reducers/loginReducer'
import { updateOneUserThunk } from '../../reducers/userReducer'

const PersonalData = ({ user }) => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const activateSnack = useTimedSnack()

  useEffect(() => {
    if (user) {
      setName(user.name)
      setUsername(user.username)
    }
  }, [user])

  const handleSend = async () => {
    dispatch(updateOneUserThunk({ id: user.id, data: {
      name,
      username,
      password
    } }))
    activateSnack('success', 'Korisnik uspešno ažuriran. Prijavi se ponovo.')
    setTimeout(() => dispatch(logout()), 3000)// Ovo verovatno više ne treba nakon što je popravljen riđuser
  }

  return (
    <Paper sx={{ mb: 2, padding: 2 }}>
      <Typography variant="body1" sx={{ mb: 2 }}>Izmeni korisničke podatke</Typography>
      <TextField
        id="name"
        label="Ime"
        variant="outlined"
        sx={{ mb: 2 }}
        fullWidth
        value={name}
        size="small"
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        id="username"
        label="Korisničko ime"
        variant="outlined"
        sx={{ mb: 2 }}
        fullWidth
        value={username}
        size="small"
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        id="password"
        type="password"
        label="Nova lozinka"
        variant="outlined"
        sx={{ mb: 2 }}
        fullWidth
        value={password}
        size="small"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        size="small"
        sx={{ textTransform: 'none' }}
        onClick={handleSend}
      >
        Promeni
      </Button>
    </Paper>
  )
}

export default PersonalData