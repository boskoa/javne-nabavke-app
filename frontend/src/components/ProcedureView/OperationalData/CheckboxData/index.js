import { FormGroup } from '@mui/material'
import Auction from './Auction'
import FrameworkAgreement from './FrameworkAgreement'
import FilledDraft from './FilledDraft'

const CheckboxData = ({ procedure, userId }) => {
  return (
    <FormGroup sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      flexWram: 'wrap',
      maxHeight: '15rem',
      mb: 2
    }}>
      <FrameworkAgreement procedure={procedure} userId={userId} />
      <Auction procedure={procedure} userId={userId} />
      <FilledDraft procedure={procedure} userId={userId} />
    </FormGroup>
  )
}

export default CheckboxData