import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { styled } from '@mui/system'
import { useState } from 'react'
import Login from './Login'
import Register from './Register'

const MyButton = styled(Button)({
  width: '12em',
  margin: '2em',
  fontWeight: 600
})

const Intro = () => {
  const [openReg, setOpenReg] = useState(false)
  const [openLog, setOpenLog] = useState(false)

  const handleRegOpen = () => {
    setOpenReg(true)
  }

  const handleRegClose = () => {
    setOpenReg(false)
  }

  const handleLogOpen = () => {
    setOpenLog(true)
  }

  const handleLogClose = () => {
    setOpenLog(false)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifySelf: 'center',
        height: '90vh'
      }}
    >
      <Paper
        elevation={4}
        sx={{
          m: 'auto',
          lineHeight: 4,
          p: 1
        }}
      >
        <MyButton variant="contained" onClick={handleRegOpen}>
          Registrujte se
        </MyButton>
        <Register open={openReg} handleClose={handleRegClose} />
        <MyButton variant="contained" onClick={handleLogOpen}>
          Prijavite se
        </MyButton>
        <Login open={openLog} handleClose={handleLogClose} />
      </Paper>
    </Box>
  )
}

export default Intro