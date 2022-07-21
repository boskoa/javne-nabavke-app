import { Paper, Box, Divider } from '@mui/material'
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
import BasicData from './BasicData'
import Notification from './Notification'
import QualificationConditions from './QualificationConditions'
import OperationalData from './OperationalData'
import useTimedSnack from '../../hooks/useTimedSnack'
import DeleteProcedure from './DeleteProcedure'

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
  const notifications = notificationsUnfiltered.filter((n) => n.procedureId === procedure?.id)
  const userId = useSelector((state) => state.login.data.id)
  const isAdmin = useSelector((state) => state.users.currentUser.admin)
  const loggedIn = useSelector((state) => state.login.data.token)
  const activateSnack = useTimedSnack()

  useEffect(() => {
    if (loggedIn) {
      dispatch(getOneThunk(parseInt(id)))
      dispatch(getByProcedure(parseInt(id)))
    }
    dispatch(change('Pregled postupka'))
  }, [id, loggedIn])

  useEffect(() => {
    if (procedure?.budget) {
      if (procedure.user.id === userId) {
        dispatch(updateProcedures(procedure))
      }
    }
  }, [procedure])

  const handleNotAuth = () => {
    if (!(procedure.user.id === userId || isAdmin)) {
      return activateSnack('info', 'Niste ovlašćeni za unos podataka na ovom postupku.')
    }
  }

  if (!procedure?.contractingAuthority && !notifications[0]) {
    return <Loading />
  }

  return (
    <Box style={{ display: 'flex', flexWrap: 'wrap' }}>
      <StepperBox>
        <PhaseStepperView procedure={procedure} userId={userId} isAdmin={isAdmin} />
        {isAdmin && <DeleteProcedure procedure={procedure} />}
      </StepperBox>
      <DataBox>
        <Paper
          elevation={10}
          sx={{ p: 1, width: '100%', height: '100%' }}
          onClick={handleNotAuth}
        >
          <BasicData procedure={procedure} userId={userId} isAdmin={isAdmin} />
          <Divider sx={{ mb: 2, mt: 2 }} />
          <OperationalData procedure={procedure} userId={userId} isAdmin={isAdmin} />
          <Divider sx={{ mb: 2, mt: 2 }} />
          <QualificationConditions
            requirements={requirements}
            procedure={procedure}
            userId={userId}
            id={id}
            isAdmin={isAdmin}
          />
          <Divider sx={{ mb: 2, mt: 2 }} />
          <Comment procedure={procedure} userId={userId} isAdmin={isAdmin} />
          <Divider sx={{ mb: 2, mt: 2 }} />
          <Notification
            notifications={notifications}
            procedure={procedure}
            userId={userId}
            isAdmin={isAdmin}
          />
        </Paper>
      </DataBox>
    </Box>
  )
}

export default ProcedureView