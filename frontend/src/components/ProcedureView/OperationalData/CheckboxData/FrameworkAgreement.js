import { Checkbox, FormControlLabel, Typography } from '@mui/material'
import { updateOneThunk } from '../../../../reducers/selectedProcedureReducer'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import useBooleanInput from '../../../../hooks/useBooleanInput'

const FrameworkAgreement = ({ procedure, userId }) => {
  const propertyName = 'frameworkAgreement'
  const [
    framework, handleFramework
  ] = useBooleanInput(
    procedure.id,
    propertyName,
    procedure.frameworkAgreement,
    updateOneThunk
  )

  return (
    <FormControlLabel
      control={<Checkbox
        disabled={!(procedure.user.id === userId)}
        checked={framework}
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
        onClick={handleFramework}
      />}
      label={<Typography variant="body2">Okvirni sporazum</Typography>}
    />
  )
}

export default FrameworkAgreement