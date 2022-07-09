import { Box, Button, FormGroup, Stack, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { addNotificationsThunk } from '../../../reducers/notificationReducer'
import { createNotifications } from '../../../reducers/selectedProcedureReducer'
import Alarm from './Alarm'
import NotificationDelete from './NotificationDelete'
import NotificationDone from './NotificationDone'
import NotificationText from './NotificationText'

const Notification = ({ notifications, procedure, userId }) => {
  const dispatch = useDispatch()

  return (
    <Box sx={{ mb: 2, p: 1 }}>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>Podsetnik</Typography>
      {notifications[0]
        ? <Box>
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Alarm
              notifications={notifications}
              procedure={procedure}
              userId={userId}
            />
            <FormGroup>
              <NotificationDone
                notifications={notifications}
                procedure={procedure}
                userId={userId}
              />
              <NotificationDelete
                notifications={notifications}
                procedure={procedure}
                userId={userId}
              />
            </FormGroup>
          </Stack>
          <NotificationText
            notifications={notifications}
            procedure={procedure}
            userId={userId}
          />
        </Box>
        : <Button
          disabled={!(procedure.user.id === userId)}
          type='submit'
          variant="contained"
          size="small"
          sx={{ m: 1, alignSelf: 'center', textTransform: 'none' }}
          onClick={() => {
            dispatch(addNotificationsThunk({
              userId,
              procedureId: procedure.id,
              done: true,
              text: ''
            }))
            dispatch(createNotifications({
              userId,
              procedureId: procedure.id,
              done: true,
              text: ''
            }))
          }}
        >Dodaj podsetnik</Button>
      }
    </Box>
  )
}

export default Notification