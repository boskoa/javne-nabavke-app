import { FormGroup } from '@mui/material'
import Auction from './Auction'
import FrameworkAgreement from './FrameworkAgreement'
import FilledDraft from './FilledDraft'

const CheckboxData = ({ procedure, userId, isAdmin }) => {
  return (
    <FormGroup sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      flexWram: 'wrap',
      maxHeight: '15rem',
      mb: 2
    }}>
      <FrameworkAgreement procedure={procedure} userId={userId} isAdmin={isAdmin} />
      <Auction procedure={procedure} userId={userId} isAdmin={isAdmin} />
      <FilledDraft procedure={procedure} userId={userId} isAdmin={isAdmin} />
    </FormGroup>
  )
}

export default CheckboxData