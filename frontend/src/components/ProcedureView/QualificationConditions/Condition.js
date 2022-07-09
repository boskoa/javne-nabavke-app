import { Checkbox, Chip, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { deleteRequirement, updateRequirement } from '../../../reducers/requirementReducer'
import useCondition from '../../../hooks/useCondition'

const Condition = ({ r, procedure, userId }) => {
  const [done, handleCheckbox, handleDelete] = useCondition(r.id, r.done, updateRequirement, deleteRequirement)

  return (
    <Chip
      disabled={!(procedure.user.id === userId)}
      label={<Typography variant="body2">{r.name}</Typography>}
      onDelete={handleDelete}
      deleteIcon={<CloseIcon fontSize="small" sx={{ p: 0, height: '1.2rem' }} />}
      variant="outlined"
      color="primary"
      icon={
        <Checkbox
          style={{ pointerEvents: 'auto' }}
          size="small"
          checked={done}
          value={r.id}
          onClick={(event) => handleCheckbox(event)}
        />}
      sx={{ mb: 1 }}
    />
  )
}

export default Condition