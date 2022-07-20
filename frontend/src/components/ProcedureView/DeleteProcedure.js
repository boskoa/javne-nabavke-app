import { Button, Dialog, DialogActions, DialogTitle, Paper } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useTimedSnack from '../../hooks/useTimedSnack'
import { deleteOneProcedureThunk } from '../../reducers/procedureReducer'

const DeleteProcedure = ({ procedure }) => {
  const [open, setOpen] = useState(false)
  const activateSnack = useTimedSnack()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRemove = async () => {
    await dispatch(deleteOneProcedureThunk(parseInt(procedure.id)))
    setOpen(false)
    navigate('/procedures')
    activateSnack('success', 'Postupak obrisan')
  }

  return (
    <Paper
      elevation={10}
      sx={{ p: 2, width: '100%', display: 'flex', justifyContent: 'center', mt: 2 }}
    >
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Potvrdi brisanje postupka</DialogTitle>
        <DialogActions
          sx={{
            display: 'flex', flexDirection: 'row', justifyContent: 'space-between'
          }}
        >
          <Button
            variant="contained"
            size="small"
            sx={{ alignSelf: 'center', textTransform: 'none', m: 1 }}
            onClick={() => setOpen(false)}
          >Poništi</Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            sx={{ alignSelf: 'center', textTransform: 'none', m: 1 }}
            onClick={handleRemove}
          >Obriši</Button>
        </DialogActions>
      </Dialog>
      <Button
        variant="contained"
        color="error"
        size="small"
        sx={{ alignSelf: 'center', textTransform: 'none' }}
        onClick={() => setOpen(true)}
      >
        Obriši postupak
      </Button>
    </Paper>
  )
}

export default DeleteProcedure