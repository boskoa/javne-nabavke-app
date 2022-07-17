import { Button, Modal, Paper, TextField, Box, Autocomplete, Tooltip, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOneThunk, updateOneThunk } from '../../../reducers/selectedProcedureReducer'
import EditIcon from '@mui/icons-material/Edit'
import { initProcedures } from '../../../reducers/procedureReducer'
import useTimedSnack from '../../../hooks/useTimedSnack'

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

const ChangeBasicDataModal = ({ procedure, userId, isAdmin }) => {
  const [procNum, setProcNum] = useState(null)
  const [authority, setAuthority] = useState('')
  const [name, setName] = useState('')
  const [user, setUser] = useState('')
  const [open, setOpen] = useState(false)
  const activateSnack = useTimedSnack()

  const dispatch = useDispatch()

  const authoritiesObjects = useSelector((state) => state.authorities.data)
  const authorities = authoritiesObjects.map((a) => a.name)
  const authorityObject = authoritiesObjects.find((a) => a.name === authority) || {}
  const userObjects = useSelector((state) => state.users.data)
  const usernames = userObjects.map((u) => u.name)
  const userObject = userObjects.find((u) => u.name === user)

  useEffect(() => {
    if (procedure) {
      setProcNum(procedure.number)
      setAuthority(procedure.contractingAuthority.name)
      setName(procedure.name)
      setUser(procedure.user.name)
    }
  }, [procedure])

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
  }
  const handleSend = async () => {
    dispatch(updateOneThunk({ id: procedure.id, data: {
      name,
      number: procNum,
      contractingAuthorityId: authorityObject.id,
      userId: userObject.id
    } }))
    dispatch(getOneThunk(procedure.id))
    dispatch(initProcedures())
    activateSnack('success', 'Postupak uspešno ažuriran')
    handleClose()
    setName(procedure.name)
    setProcNum(procedure.number)
  }

  if (!procedure) {
    return <div />
  }

  return (
    <div>
      <Tooltip title="Izmeni osnovne podatke">
        <span>
          <IconButton
            disabled={!(procedure.user.id === userId || isAdmin)}
            sx={{ padding: 'auto' }}
            onClick={handleOpen}
          >
            <EditIcon
              fontSize="small"
            />
          </IconButton>
        </span>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={style}>
          <Autocomplete
            disablePortal
            id="authority"
            variant="outlined"
            sx={{ mb: 1 }}
            options={authorities}
            fullWidth
            size="small"
            value={authorities.find((a) => a === authority)}
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
            value={name}
            size="small"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="procNum"
            label="Broj obavještenja"
            variant="outlined"
            sx={{ mb: 1 }}
            fullWidth
            value={procNum}
            size="small"
            onChange={(e) => setProcNum(e.target.value)}
          />
          <Autocomplete
            disablePortal
            id="user"
            variant="outlined"
            sx={{ mb: 1 }}
            options={usernames}
            fullWidth
            value={usernames.find((u) => u === user)}
            size="small"
            onChange={(e, v) => {
              setUser(v)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Korisnik"
              />
            )}
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
              Unesi
            </Button>
          </Box>
        </Paper>
      </Modal>
    </div>
  )
}

export default ChangeBasicDataModal