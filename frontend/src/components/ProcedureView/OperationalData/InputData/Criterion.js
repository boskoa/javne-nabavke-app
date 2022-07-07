import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import useSelectInput from '../../../../hooks/useSelectInput'
import { updateOneThunk } from '../../../../reducers/selectedProcedureReducer'

const Criterion = ({ procedure, userId }) => {
  const propertyName = 'criterion'
  const [
    criterion, handleCriterion
  ] = useSelectInput(procedure.id, propertyName, procedure.criterion, updateOneThunk)

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel
        id="criterion"
        sx={{ fontSize: '1rem' }}
      >
        Kriterijum odabira ponude
      </InputLabel>
      <Select
        disabled={!(procedure.user.id === userId)}
        labelId="criterion"
        id="selectCriterion"
        value={criterion}
        sx={{ height: '2.5rem', fontSize: '1rem' }}
        label="Kriterijum odabira ponude"
        onChange={(e) => handleCriterion(e.target.value)}
      >
        <MenuItem value='Najniža cena' sx={{ fontSize: '0.8rem' }}>
          Najniža cena
        </MenuItem>
        <MenuItem value='Ekonomski najpovoljnija ponuda' sx={{ fontSize: '0.8rem' }}>
          Ekonomski najpovoljnija ponuda
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default Criterion