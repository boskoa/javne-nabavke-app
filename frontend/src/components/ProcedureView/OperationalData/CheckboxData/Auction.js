import { Checkbox, FormControlLabel, Typography } from '@mui/material'
import { updateOneThunk } from '../../../../reducers/selectedProcedureReducer'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import useBooleanInput from '../../../../hooks/useBooleanInput'

const Auction = ({ procedure, userId, isAdmin }) => {
  const propertyName = 'auction'
  const [
    auction, handleAuction
  ] = useBooleanInput(procedure.id, propertyName, procedure.auction, updateOneThunk)

  return (
    <FormControlLabel
      control={<Checkbox
        disabled={!(procedure.user.id === userId || isAdmin)}
        checked={auction}
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
        onClick={handleAuction}
      />}
      label={<Typography variant="body2">eAukcija</Typography>}
    />
  )
}

export default Auction