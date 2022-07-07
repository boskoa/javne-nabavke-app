import {
  Paper, Box, Typography, FormGroup, Checkbox, TextField, Button,
  FormControl, Divider, Chip, Stack
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
import CloseIcon from '@mui/icons-material/Close'
import PhaseStepperView from './PhaseStepperView'
import { styled } from '@mui/material/styles'
import Loading from '../Loading'
import { updateProcedures } from '../../reducers/procedureReducer'
import { change } from '../../reducers/pathReducer'
import {
  addNotificationsThunk, updateAlarmThunk, updateDoneThunk, updateTextThunk
} from '../../reducers/notificationReducer'
import Comment from './Comment'
import DeliveryLocation from './DeliveryLocation'
import CheckboxData from './OperationalData/CheckboxData'
import Budget from './OperationalData/InputData/Budget'
import Amount from './OperationalData/InputData/Amount'
import DeliveryDate from './OperationalData/InputData/DeliveryDate'
import OfferValidity from './OperationalData/InputData/OfferValidity'
import Payment from './OperationalData/InputData/Payment'
import Copy from './OperationalData/InputData/Copy'
import Category from './OperationalData/InputData/Category'
import Criterion from './OperationalData/InputData/Criterion'

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

const ProcedureView = ({ notificationsUnfiltered }) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const procedure = useSelector((state) => state.selectedProcedure.data)
  const requirements = useSelector((state) => state.requirement.data)
  const notifications = notificationsUnfiltered.filter((n) => n.procedureId === procedure.id)
  const userId = useSelector((state) => state.login.data.id)
  const [requirement, setRequirement] = useState('')
  const [date, setDate] = useState('')
  const [text, setText] = useState('')
  const [alarm, setAlarm] = useState('')
  const [done, setDone] = useState(false)
  console.log('PROSIĐR', procedure)

  useEffect(() => {
    dispatch(getOneThunk(parseInt(id)))
    dispatch(getByProcedure(parseInt(id)))
    dispatch(change('Pregled postupka'))
  }, [id])

  useEffect(() => {
    if (procedure.budget) {
      setDate(procedure.submissionDate)
      if (procedure.user.id === userId) {
        dispatch(updateProcedures(procedure))
      }
    }
  }, [procedure])

  useEffect(() => {
    if (notifications[0]) {
      if (notifications[0].alarm) {
        setAlarm(notifications[0].alarm)
      }
      setText(notifications[0].text)
      setDone(notifications[0].done)
    }
  }, [notifications[0]])

  const handleDate = () => {
    if (procedure.user.id === userId) {
      dispatch(updateOneThunk({
        id: procedure.id, data: { submissionDate: date.toString() }
      }))
    }
  }

  const handleAlarm = () => {
    if (notifications[0]) {
      dispatch(updateAlarmThunk({
        id: notifications[0].id, alarm: alarm.toString()
      }))
    } else {
      dispatch(addNotificationsThunk({
        userId,
        procedureId: procedure.id,
        alarm: alarm.toString()
      }))
    }
    console.log('ALARM', alarm, notifications[0].alarm)
  }

  useEffect(() => {
    if (date) {
      handleDate()
    }
  }, [date])

  useEffect(() => {
    if (alarm) {
      handleAlarm()
    }
  }, [alarm])

  console.log('REQUIREMENTS PROCVIEW', requirements, procedure)

  if (!procedure.contractingAuthority && !notifications[0]) {
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

  const handleAlarmCheck = async (event) => {
    dispatch(updateDoneThunk({ id: notifications[0].id, done }))
    setDone(!done)
    event.target.checked = done
  }

  const handleText = () => {
    if (notifications && !(notifications.length)) {
      console.log('NO NOTIFICATION')
      dispatch(addNotificationsThunk({ procedureId: procedure.id, text }))
    } else {
      dispatch(updateTextThunk({
        id: notifications[0].id, text
      }))
    }
  }

  return (
    <Box style={{ display: 'flex', flexWrap: 'wrap' }}>
      <StepperBox>
        <PhaseStepperView procedure={procedure} userId={userId} />
      </StepperBox>
      <DataBox>
        <Paper
          elevation={10}
          sx={{
            p: 1, width: '100%', height: '100%', backgroundColor: '#F5FFFA'
          }}
        >
          <Box sx={{ p: 1 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Osnovni podaci</Typography>
            <Box sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between'
            }}>
              <Typography sx={{ padding: 1 }} variant="body2">
                Ugovorni organ: {procedure.contractingAuthority.name}
              </Typography>
              <Typography sx={{ padding: 1 }} variant="body2">
                Naziv: {procedure.name}
              </Typography>
              <Typography sx={{ padding: 1 }} variant="body2">
                Broj obaveštenja: {procedure.number}
              </Typography>
              <Typography sx={{ padding: 1 }} variant="body2">
                Korisnik: {procedure.user.name}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ mb: 2, mt: 2 }} />
          <Box sx={{ p: 1 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Operativni podaci</Typography>
            <CheckboxData procedure={procedure} userId={userId} />
            <FormGroup>
              <Category procedure={procedure} userId={userId} />
              <Criterion procedure={procedure} userId={userId} />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  disabled={!(procedure.user.id === userId)}
                  fullWidth
                  ampm={false}
                  renderInput={(props) => <TextField {...props} />}
                  label="Rok za predaju"
                  sx={{ height: '2.5rem', fontSize: '0.8rem' }}
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue)
                  }}
                />
              </LocalizationProvider>
              <Budget procedure={procedure} userId={userId} />
              <DeliveryDate procedure={procedure} userId={userId} />
              <DeliveryLocation procedure={procedure} userId={userId} />
              <OfferValidity procedure={procedure} userId={userId} />
              <Payment procedure={procedure} userId={userId} />
              <Copy procedure={procedure} userId={userId} />
              <Amount procedure={procedure} userId={userId} />
            </FormGroup>
          </Box>
          <Divider sx={{ mb: 2, mt: 2 }} />
          <Box sx={{ p: 1 }}>
            <Typography variant="subtitle1">Kvalifikacioni uslovi</Typography>
            <FormGroup sx={{
              m: 1,
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'wrap',
              maxHeight: '40vh'
            }}>
              {requirements.map((r) => (
                <div
                  style={{
                    display: 'flex',
                    displayWrap: 'wrap',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginRight: 20
                  }}
                  key={r.id}
                >
                  <Chip
                    disabled={!(procedure.user.id === userId)}
                    label={<Typography variant="body2">{r.name}</Typography>}
                    onDelete={async () => {
                      dispatch(deleteRequirement(parseInt(r.id)))
                    }}
                    deleteIcon={<CloseIcon fontSize="small" sx={{ p: 0, height: '1.2rem' }} />}
                    variant="outlined"
                    color="primary"
                    icon={
                      <Checkbox
                        style={{ pointerEvents: 'auto' }}
                        size="small"
                        checked={r.done}
                        value={r.id}
                        onClick={(event) => handleCheckbox(event)}
                      />}
                    sx={{ mb: 1 }}
                  />
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
                disabled={!(procedure.user.id === userId)}
                id="condition"
                label="Novi uslov"
                value={requirement}
                variant="outlined"
                sx={{ m: 1 }}
                inputProps={{ maxLength: 30 }}
                size="small"
                onChange={(e) => setRequirement(e.target.value)}
              />
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Button
                  disabled={!(procedure.user.id === userId)}
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
          <Comment procedure={procedure} userId={userId} />
          <Divider sx={{ mb: 2, mt: 2 }} />
          <Box sx={{ mb: 2, p: 1 }}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>Podsetnik</Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns} fullWidth>
                <DateTimePicker
                  disabled={!(procedure.user.id === userId)}
                  fullWidth
                  ampm={false}
                  renderInput={(props) => <TextField {...props} />}
                  label="Alarm"
                  sx={{ height: '2.5rem', fontSize: '0.8rem' }}
                  value={alarm}
                  onChange={(newValue) => {
                    setAlarm(newValue)
                  }}
                />
              </LocalizationProvider>
              <Checkbox
                disabled={!(procedure.user.id === userId)}
                style={{ pointerEvents: 'auto' }}
                size="small"
                checked={done}
                onClick={(event) => handleAlarmCheck(event)}
              />
            </Stack>
            <FormControl fullWidth>
              <TextField
                disabled={!(procedure.user.id === userId)}
                multiline
                size="small"
                label="Tekst"
                id="notificationText"
                sx={{ fontSize: '0.8rem' }}
                value={text}
                onChange={(e) => {
                  console.log('ONČEJNDŽ', e.target.value, text)
                  setText(e.target.value)
                  console.log('AFTER ČEJNDŽ', e.target.value, text)
                }}
                onBlur={handleText}
                InputLabelProps={{ shrink: true }}
                inputProps={{ maxLength: 100 }}
              />
            </FormControl>
          </Box>
        </Paper>
      </DataBox>
    </Box>
  )
}

export default ProcedureView