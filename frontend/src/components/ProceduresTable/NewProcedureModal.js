import { Button, Modal, Paper, TextField, Box, Autocomplete, Tooltip } from '@mui/material'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllThunk, newAuthorityThunk } from '../../reducers/authorityReducer'
import { clean, initProcedures, newProcedure } from '../../reducers/procedureReducer'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import useTimedSnack from '../../hooks/useTimedSnack'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  minWidth: '50vw'
}

const AuthorityForm = ({ setOpen, setAuthority }) => {
  const [name, setName] = useState('')
  const [jib, setJib] = useState('')
  const [ajnCode, setAjnCode] = useState(0)
  const loggedIn = useSelector((state) => state.login.data.token)

  const dispatch = useDispatch()

  const handleClose = () => {
    setOpen(false)
    setAuthority('')
  }
  const handleSend = async () => {
    if (loggedIn) {
      dispatch(newAuthorityThunk({ name, jib, ajnCode: new Number(ajnCode) }))
    }
    setName('')
    setJib('')
    setAjnCode(0)
    setOpen(false)
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <TextField
        id="name"
        label="Naziv UO"
        variant="outlined"
        sx={{ mb: 1 }}
        fullWidth
        size="small"
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        id="jib"
        label="JIB"
        variant="outlined"
        sx={{ mb: 1 }}
        fullWidth
        size="small"
        onChange={(e) => setJib(e.target.value)}
      />
      <TextField
        id="ajnCode"
        label="AJN KOD"
        variant="outlined"
        sx={{ mb: 1 }}
        fullWidth
        size="small"
        onChange={(e) => setAjnCode(e.target.value)}
      />
      <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          size="small"
          color="error"
          sx={{ textTransform: 'none' }}
          onClick={handleClose}
        >
          Poništi
        </Button>
        <Button
          variant="contained"
          size="small"
          sx={{ textTransform: 'none' }}
          onClick={handleSend}
        >
          Pošalji
        </Button>
      </Box>
    </div>
  )
}

const NewProcedureModal = () => {
  const [procNum, setProcNum] = useState('')
  const [authority, setAuthority] = useState('')
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)
  const [openAuth, setOpenAuth] = useState(false)
  const activateSnack = useTimedSnack()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllThunk())
  }, [])

  useEffect(() => {
    dispatch(getAllThunk(authority))
  }, [authority])

  const authoritiesObjects = useSelector((state) => state.authorities.data)
  const authorities = authoritiesObjects.map((a) => a.name)
  const authorityObject = authoritiesObjects.find((a) => a.name === authority) || {}
  const username = useSelector((state) => state.login.data.username)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setOpenAuth(false)
    setAuthority('')
    setProcNum('')
    setName('')
  }
  const handleSend = async () => {
    dispatch(newProcedure({
      name,
      number: procNum,
      jib: authorityObject.jib,
      username
    }))
    dispatch(clean())
    setTimeout(() => dispatch(initProcedures()), 200)
    activateSnack('success', 'Postupak uspešno unet')
    handleClose()
  }

  return (
    <div>
      <Tooltip title="Unesi novi postupak">
        <Fab
          color="primary"
          aria-label="add"
          size="small"
          sx={{ position: 'fixed', bottom: 10, right: 10 }}
          onClick={handleOpen}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={style}>
          <TextField
            id="procNum"
            label="Broj obavještenja"
            variant="outlined"
            sx={{ mb: 1 }}
            fullWidth
            size="small"
            onChange={(e) => setProcNum(e.target.value)}
          />
          <Autocomplete
            disablePortal
            id="authority"
            variant="outlined"
            sx={{ mb: 1 }}
            options={authorities}
            fullWidth
            size="small"
            onChange={(e, v) => {
              setAuthority(v)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Ugovorni organ"
              />
            )}
          />
          <TextField
            id="name"
            label="Naziv postupka"
            variant="outlined"
            sx={{ mb: 1 }}
            fullWidth
            size="small"
            onChange={(e) => setName(e.target.value)}
          />
          <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              size="small"
              color="error"
              sx={{ textTransform: 'none' }}
              onClick={handleClose}
            >
              Poništi
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ textTransform: 'none' }}
              onClick={setOpenAuth}
            >
              Novi UO
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ textTransform: 'none' }}
              onClick={handleSend}
            >
              Unesi
            </Button>
          </Box>
          {openAuth && (
            <AuthorityForm setOpen={setOpenAuth} setAuthority={setAuthority} />
          )}
        </Paper>
      </Modal>
    </div>
  )
}

export default NewProcedureModal