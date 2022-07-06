import { Checkbox, FormControlLabel, Typography } from '@mui/material'
import { updateOneThunk } from '../../../../reducers/selectedProcedureReducer'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import useBooleanInput from '../../../../hooks/useBooleanInput'

const FilledDraft = ({ procedure, userId }) => {
  const propertyName = 'filledDraft'
  const [
    draft, handleDraft
  ] = useBooleanInput(procedure.id, propertyName, procedure.filledDraft, updateOneThunk)

  return (
    <FormControlLabel
      control={<Checkbox
        disabled={!(procedure.user.id === userId)}
        checked={draft}
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
        onClick={handleDraft}
      />}
      label={<Typography variant="body2">Popunjen nacrt ugovora</Typography>}
    />
  )
}

export default FilledDraft