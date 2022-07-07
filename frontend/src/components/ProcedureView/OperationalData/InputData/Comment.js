import { Box, FormControl, TextField, Typography } from '@mui/material'
import useInput from '../../hooks/useInput'
import { updateOneThunk } from '../../reducers/selectedProcedureReducer'

const Comment = ({ procedure, userId }) => {
  const propertyName = 'comment'
  const [
    comment, setComment, handleComment
  ] = useInput(procedure.id, propertyName, procedure.comment, updateOneThunk)

  return (
    <Box elevation={0} sx={{ mb: 2, p: 1, background: '#F5FFFA' }}>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>Komentar</Typography>
      <FormControl fullWidth>
        <TextField
          disabled={!(procedure.user.id === userId)}
          multiline
          size="small"
          label="Tekst"
          id="commentText"
          sx={{ fontSize: '0.8rem' }}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value)
          }}
          onBlur={() => handleComment(comment)}
          InputLabelProps={{ shrink: true }}
          inputProps={{ maxLength: 300 }}
        />
      </FormControl>
    </Box>
  )
}

export default Comment