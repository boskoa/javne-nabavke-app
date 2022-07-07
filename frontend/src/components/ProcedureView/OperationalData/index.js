import {
  Paper, Box, Typography, FormGroup, Checkbox, TextField, Button,
  FormControl, InputLabel, Select, MenuItem, Divider, Chip, Stack
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
import InputData from './InputData'

const OperationalData = ({ procedure, userId }) => {
  return (
    <Box elevation={0} sx={{ p: 1, background: '#F5FFFA' }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>Operativni podaci</Typography>
      <CheckboxData procedure={procedure} userId={userId} />
      <InputData procedure={procedure} userId={userId} />
    </Box>
  )
}

export default OperationalData