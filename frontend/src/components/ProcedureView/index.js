import { Paper, Box, Typography, FormGroup, Divider } from '@mui/material'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getByProcedure } from '../../reducers/requirementReducer'
import { getOneThunk } from '../../reducers/selectedProcedureReducer'
import PhaseStepperView from './PhaseStepperView'
import { styled } from '@mui/material/styles'
import Loading from '../Loading'
import { updateProcedures } from '../../reducers/procedureReducer'
import { change } from '../../reducers/pathReducer'
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
import BasicData from './BasicData'
import SubmissionDate from './OperationalData/InputData/SubmissionDate'
import Notification from './Notification'
import QualificationConditions from './QualificationConditions'

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
  const notificationsUnfiltered = useSelector((state) => state.notifications.data)
  const notifications = notificationsUnfiltered.filter((n) => n.procedureId === procedure.id)
  const userId = useSelector((state) => state.login.data.id)

  useEffect(() => {
    dispatch(getOneThunk(parseInt(id)))
    dispatch(getByProcedure(parseInt(id)))
    dispatch(change('Pregled postupka'))
  }, [id])

  useEffect(() => {
    if (procedure.budget) {
      if (procedure.user.id === userId) {
        dispatch(updateProcedures(procedure))
      }
    }
  }, [procedure])

  if (!procedure.contractingAuthority && !notifications[0]) {
    return <Loading />
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
          <BasicData procedure={procedure} />
          <Divider sx={{ mb: 2, mt: 2 }} />
          <Box sx={{ p: 1 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Operativni podaci</Typography>
            <CheckboxData procedure={procedure} userId={userId} />
            <FormGroup>
              <Category procedure={procedure} userId={userId} />
              <Criterion procedure={procedure} userId={userId} />
              <SubmissionDate procedure={procedure} userId={userId} />
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
          <QualificationConditions
            requirements={requirements}
            procedure={procedure}
            userId={userId}
            id={id}
          />
          <Divider sx={{ mb: 2, mt: 2 }} />
          <Comment procedure={procedure} userId={userId} />
          <Divider sx={{ mb: 2, mt: 2 }} />
          <Notification
            notifications={notifications}
            procedure={procedure}
            userId={userId}
          />
        </Paper>
      </DataBox>
    </Box>
  )
}

export default ProcedureView