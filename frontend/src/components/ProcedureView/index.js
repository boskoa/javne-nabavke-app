import {
  Paper, Box, Typography, FormGroup, Checkbox, FormControlLabel, TextField, Button, IconButton
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  addRequirement, getByProcedure, updateRequirement, deleteRequirement
} from '../../reducers/requirementReducer'
import { getOneThunk } from '../../reducers/selectedProcedureReducer'
import ClearIcon from '@mui/icons-material/Clear'
import PhaseStepperView from './PhaseStepperView'
import { styled } from '@mui/material/styles'

const StepperBox = styled(Box)(({ theme }) => ({
  maxWidth: '28%',
  marginBottom: 3,
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    marginBottom: 20,
    flexGrow: 1
  }
}))

const DataBox = styled(Box)(({ theme }) => ({
  maxWidth: '68%',
  marginLeft: 20,
  marginBottom: 3,
  flexGrow: 1,
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    marginLeft: 0
  }
}))

const ProcedureView = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const procedure = useSelector((state) => state.selectedProcedure.data)
  const requirements = useSelector((state) => state.requirement.data)
  const [requirement, setRequirement] = useState('')

  useEffect(() => {
    dispatch(getOneThunk(parseInt(id)))
    dispatch(getByProcedure(parseInt(id)))
  }, [])

  console.log('REQUIREMENTS PROCVIEW', requirements, procedure)

  if (!procedure.contractingAuthority) {
    return <div>Loading...</div>
  }

  const handleNewRequirement = async (event) => {
    event.preventDefault()
    dispatch(addRequirement({ name: requirement, checked: false, procedureId: parseInt(id) }))
    setRequirement('')
    event.target.value = requirement
  }

  const handleCheckbox = async (event) => {
    const selectedReq = requirements.find((r) => r.id === parseInt(event.target.value))
    dispatch(updateRequirement({ id: selectedReq.id, reqDone: selectedReq.done }))
    event.target.checked = !(selectedReq.done)
  }

  return (
    <Box style={{ display: 'flex', flexWrap: 'wrap' }}>
      <StepperBox>
        <PhaseStepperView procedure={procedure} />
      </StepperBox>
      <DataBox>
        <Paper
          elevation={10}
          sx={{
            p: 1, width: '100%', height: '100%', backgroundColor: '#F5FFFA'
          }}
        >
          <Box elevation={0} sx={{ mb: 2, p: 1, background: '#F5FFFA' }}>
            <Typography variant="h6">Osnovni podaci</Typography>
            <Box sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between'
            }}>
              <Typography>
              Ugovorni organ: {procedure.contractingAuthority.name}
              </Typography>
              <Typography>Naziv: {procedure.name}</Typography>
              <Typography>ID: {procedure.id}</Typography>
            </Box>
          </Box>
          <Box elevation={0} sx={{ mb: 2, p: 1, background: '#F5FFFA' }}>
            <Typography variant="h6">Zadaci</Typography>
            <FormGroup sx={{
              m: 1,
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'wrap',
              maxHeight: '30vh'
            }}>
              {requirements.map((r) => (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginRight: 20
                  }}
                  key={r.id}
                >
                  <FormControlLabel
                    style={{ pointerEvents: 'none' }}
                    control={
                      <Checkbox
                        style={{ pointerEvents: 'auto' }}
                        checked={r.done}
                        value={r.id}
                        onClick={(event) => handleCheckbox(event)}
                      />}
                    label={r.name} />
                  <IconButton size="small" color="inherit" onClick={async () => {
                    console.log('CLICKED', r.id)
                    dispatch(deleteRequirement(parseInt(r.id)))
                  }}>
                    <ClearIcon fontSize="small" sx={{ p: 0 }} />
                  </IconButton>
                </div>
              ))
              }
            </FormGroup>
            <form
              style={{
                display: 'flex',
                alignContent: 'center'
              }}
              onSubmit={handleNewRequirement}
            >
              <TextField
                id="condition"
                label="Novi uslov"
                value={requirement}
                variant="outlined"
                sx={{ m: 1 }}
                size="small"
                onChange={(e) => setRequirement(e.target.value)}
              />
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Button
                  type='submit'
                  variant="contained"
                  size="small"
                  sx={{ m: 1, alignSelf: 'center', textTransform: 'none' }}
                >
                    Dodaj
                </Button>
              </div>
            </form>
          </Box>
          <Box elevation={0} sx={{ mb: 2, p: 1, background: '#F5FFFA' }}>Osnovni podaci</Box>
          <Box elevation={0} sx={{ mb: 2, p: 1, background: '#F5FFFA' }}>Osnovni podaci</Box>
        </Paper>
      </DataBox>
    </Box>
  )
}

export default ProcedureView