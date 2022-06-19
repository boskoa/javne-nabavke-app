import {
  Paper, Box, Typography, FormGroup, Checkbox, FormControlLabel, TextField, Button, IconButton,
  FormControl, InputLabel, Select, MenuItem, Divider
} from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  addRequirement, getByProcedure, updateRequirement, deleteRequirement
} from '../../reducers/requirementReducer'
import { getOneThunk, updateOneThunk } from '../../reducers/selectedProcedureReducer'
import ClearIcon from '@mui/icons-material/Clear'
import PhaseStepperView from './PhaseStepperView'
import { styled } from '@mui/material/styles'
import Loading from '../Loading'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'

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
  const [budget, setBudget] = useState('')
  const [delivery, setDelivery] = useState(0)
  const [location, setLocation] = useState('')
  const [validity, setValidity] = useState(0)
  const [payment, setPayment] = useState(0)
  const [copy, setCopy] = useState(0)
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    dispatch(getOneThunk(parseInt(id)))
    dispatch(getByProcedure(parseInt(id)))
  }, [])

  useEffect(() => {
    if (procedure.budget) {
      setBudget(Intl.NumberFormat('sr-BA', {
        style: 'currency', currency: 'BAM'
      }).format(procedure.budget))
      setDelivery(procedure.deliveryDate)
      setLocation(procedure.deliveryLocation)
      setValidity(procedure.offerValidity)
      setPayment(procedure.payment)
      setCopy(procedure.copy)
      setAmount(Intl.NumberFormat('sr-BA', {
        style: 'currency', currency: 'BAM'
      }).format(procedure.amount))
      setDate(procedure.submissionDate)
    }
  }, [procedure])

  const handleDate = () => {
    dispatch(updateOneThunk({
      id: procedure.id, data: { submissionDate: date.toString() }
    }))
    console.log('PREDAJA', date, procedure.submissionDate)
  }

  useEffect(() => {
    if (date) {
      handleDate()
    }
  }, [date])

  console.log('REQUIREMENTS PROCVIEW', requirements, procedure)

  if (!procedure.contractingAuthority) {
    return <Loading />
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

  const handleSelectType = (event) => {
    dispatch(updateOneThunk({
      id: procedure.id, data: { category: event.target.value }
    }))
  }

  const handleSelectCriterion = (event) => {
    dispatch(updateOneThunk({
      id: procedure.id, data: { criterion: event.target.value }
    }))
  }

  const handleFramework = () => {
    dispatch(updateOneThunk({
      id: procedure.id, data: { frameworkAgreement: !procedure.frameworkAgreement }
    }))
  }

  const handleAuction = () => {
    dispatch(updateOneThunk({
      id: procedure.id, data: { auction: !procedure.auction }
    }))
  }

  const handleDraft = () => {
    dispatch(updateOneThunk({
      id: procedure.id, data: { filledDraft: !procedure.filledDraft }
    }))
  }

  const handleBudget = () => {
    let formatBudget = budget
    formatBudget = formatBudget.replace(' KM','')
    formatBudget = formatBudget.replace('.','')
    formatBudget = formatBudget.replace(',','.')
    dispatch(updateOneThunk({
      id: procedure.id, data: { budget: parseFloat(formatBudget) }
    }))
    //setBudget(Intl.NumberFormat('sr-BA', { style: 'decimal' }).format(event.target.value))
  }

  const handleDelivery = () => {
    dispatch(updateOneThunk({
      id: procedure.id, data: { deliveryDate: parseInt(delivery) }
    }))
  }

  const handleLocation = () => {
    dispatch(updateOneThunk({
      id: procedure.id, data: { deliveryLocation: location }
    }))
  }

  const handleValidity = () => {
    dispatch(updateOneThunk({
      id: procedure.id, data: { offerValidity: parseInt(validity) }
    }))
  }

  const handlePayment = () => {
    dispatch(updateOneThunk({
      id: procedure.id, data: { payment: parseInt(payment) }
    }))
  }

  const handleCopy = () => {
    dispatch(updateOneThunk({
      id: procedure.id, data: { copy: parseInt(copy) }
    }))
  }

  const handleAmount = () => {
    let formatAmount = amount
    formatAmount = formatAmount.replace(' KM','')
    formatAmount = formatAmount.replace('.','')
    formatAmount = formatAmount.replace(',','.')
    dispatch(updateOneThunk({
      id: procedure.id, data: { amount: parseFloat(formatAmount) }
    }))
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
          <Box elevation={0} sx={{ p: 1, background: '#F5FFFA' }}>
            <Typography variant="subtitle1">Osnovni podaci</Typography>
            <Box sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between'
            }}>
              <Typography variant="body2">
                Ugovorni organ: {procedure.contractingAuthority.name}
              </Typography>
              <Typography variant="body2">Naziv: {procedure.name}</Typography>
              <Typography variant="body2">
                Broj obaveštenja: {procedure.number}
              </Typography>
              <Typography variant="body2">ID: {procedure.id}</Typography>
            </Box>
          </Box>
          <Divider sx={{ mb: 2, mt: 2 }} />
          <Box elevation={0} sx={{ p: 1, background: '#F5FFFA' }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Operativni podaci</Typography>
            <FormGroup sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              flexWram: 'wrap',
              maxHeight: '15rem',
              mb: 2
            }}>
              <FormControlLabel
                control={<Checkbox
                  checked={procedure.frameworkAgreement}
                  icon={<BookmarkBorderIcon />}
                  checkedIcon={<BookmarkIcon />}
                  onClick={handleFramework}
                />}
                label={<Typography variant="body2">Okvirni sporazum</Typography>}
              />
              <FormControlLabel
                control={<Checkbox
                  checked={procedure.auction}
                  icon={<BookmarkBorderIcon />}
                  checkedIcon={<BookmarkIcon />}
                  onClick={handleAuction}
                />}
                label={<Typography variant="body2">eAukcija</Typography>}
              />
              <FormControlLabel
                control={<Checkbox
                  checked={procedure.filledDraft}
                  icon={<BookmarkBorderIcon />}
                  checkedIcon={<BookmarkIcon />}
                  onClick={handleDraft}
                />}
                label={<Typography variant="body2">Popunjen nacrt ugovora</Typography>}
              />
            </FormGroup>
            <FormGroup>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel
                  id="procedureType"
                  sx={{ fontSize: '0.8rem' }}
                >
                  Vrsta postupka
                </InputLabel>
                <Select
                  labelId="procedureType"
                  id="selectType"
                  value={procedure.category}
                  sx={{ height: '2.5rem', fontSize: '0.8rem' }}
                  label="Vrsta postupka"
                  onChange={(e) => handleSelectType(e)}
                >
                  <MenuItem value='Direktni sporazum' sx={{ fontSize: '0.8rem' }}>
                  Direktni sporazum
                  </MenuItem>
                  <MenuItem value='Konkurentski zahtev' sx={{ fontSize: '0.8rem' }}>
                  Konkurentski zahtev
                  </MenuItem>
                  <MenuItem value='Otvoreni postupak' sx={{ fontSize: '0.8rem' }}>
                  Otvoreni postupak
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel
                  id="criterion"
                  sx={{ fontSize: '0.8rem' }}
                >
                  Kriterijum odabira ponude
                </InputLabel>
                <Select
                  labelId="criterion"
                  id="selectCriterion"
                  value={procedure.criterion}
                  sx={{ height: '2.5rem', fontSize: '0.8rem' }}
                  label="Kriterijum odabira ponude"
                  onChange={(e) => handleSelectCriterion(e)}
                >
                  <MenuItem value='Najniža cena' sx={{ fontSize: '0.8rem' }}>
                  Najniža cena
                  </MenuItem>
                  <MenuItem value='Ekonomski najpovoljnija ponuda' sx={{ fontSize: '0.8rem' }}>
                  Ekonomski najpovoljnija ponuda
                  </MenuItem>
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  fullWidth
                  ampm={false}
                  renderInput={(props) => <TextField {...props} />}
                  label="Rok za predaju"
                  sx={{ height: '2.5rem', fontSize: '0.8rem' }}
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue)
                    console.log('PROMENAAAAAAAAAA')
                    setTimeout(() => console.log('ROKZAPREDAJU', date, date.toString()), 1000)
                  }}
                />
              </LocalizationProvider>
              <FormControl fullWidth>
                <TextField
                  size="small"
                  label="Budžet"
                  id="budget"
                  sx={{ height: '2.5rem', fontSize: '0.8rem', mb: 1.5,mt: 4 }}
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  onBlur={handleBudget}
                  InputLabelProps={{ shrink: true }}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  size="small"
                  label="Rok isporuke (u danima)"
                  id="deliveryDate"
                  sx={{ height: '2.5rem', fontSize: '0.8rem', mb: 1.5 }}
                  value={delivery}
                  onChange={(e) => setDelivery(e.target.value)}
                  onBlur={handleDelivery}
                  InputLabelProps={{ shrink: true }}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  size="small"
                  label="Mesto isporuke"
                  id="deliveryLocation"
                  sx={{ height: '2.5rem', fontSize: '0.8rem', mb: 1.5 }}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onBlur={handleLocation}
                  InputLabelProps={{ shrink: true }}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  size="small"
                  label="Važenje ponude (u danima)"
                  id="offerValidity"
                  sx={{ height: '2.5rem', fontSize: '0.8rem', mb: 1.5 }}
                  value={validity}
                  onChange={(e) => setValidity(e.target.value)}
                  onBlur={handleValidity}
                  InputLabelProps={{ shrink: true }}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  size="small"
                  label="Rok plaćanja (u danima)"
                  id="payment"
                  sx={{ height: '2.5rem', fontSize: '0.8rem', mb: 1.5 }}
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                  onBlur={handlePayment}
                  InputLabelProps={{ shrink: true }}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  size="small"
                  label="Broj kopija ponude"
                  id="copy"
                  sx={{ height: '2.5rem', fontSize: '0.8rem', mb: 1.5 }}
                  value={copy}
                  onChange={(e) => setCopy(e.target.value)}
                  onBlur={handleCopy}
                  InputLabelProps={{ shrink: true }}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  size="small"
                  label="Vrednost ponude"
                  id="amount"
                  sx={{ height: '2.5rem', fontSize: '0.8rem', mb: 1.5 }}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  onBlur={handleAmount}
                  InputLabelProps={{ shrink: true }}
                />
              </FormControl>
            </FormGroup>
          </Box>
          <Divider sx={{ mb: 2, mt: 2 }} />
          <Box elevation={0} sx={{ p: 1, background: '#F5FFFA' }}>
            <Typography variant="subtitle1">Kvalifikacioni uslovi</Typography>
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
                    label={<Typography variant="body2">{r.name}</Typography>}
                  />
                  <IconButton size="small" color="inherit" onClick={async () => {
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
          <Divider sx={{ mb: 2, mt: 2 }} />
          <Box elevation={0} sx={{ mb: 2, p: 1, background: '#F5FFFA' }}>
            <Typography variant="subtitle1">Dodatni podaci</Typography>
          </Box>
        </Paper>
      </DataBox>
    </Box>
  )
}

export default ProcedureView