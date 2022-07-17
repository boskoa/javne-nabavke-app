import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import useSelectInput from '../../../../hooks/useSelectInput'
import { updateOneThunk } from '../../../../reducers/selectedProcedureReducer'

const Category = ({ procedure, userId, isAdmin }) => {
  const propertyName = 'category'
  const [
    category, handleCategory
  ] = useSelectInput(procedure.id, propertyName, procedure.category, updateOneThunk)

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel
        id="category"
        sx={{ fontSize: '1rem' }}
      >
      Vrsta postupka
      </InputLabel>
      <Select
        disabled={!(procedure.user.id === userId || isAdmin)}
        labelId="procedureType"
        id="selectType"
        value={category}
        sx={{ height: '2.5rem', fontSize: '1rem' }}
        label="Vrsta postupka"
        onChange={(e) => {
          handleCategory(e.target.value)
        }}
      >
        <MenuItem value='Direktni sporazum' sx={{ fontSize: '0.8rem' }}>
          Direktni sporazum
        </MenuItem>
        <MenuItem value='Konkurentski zahtev' sx={{ fontSize: '0.8rem' }}>
          Konkurentski zahtev
        </MenuItem>
        <MenuItem value='Otvoreni postupak' sx={{ fontSize: '0.8rem' }}>
          Otvoreni postupak
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default Category