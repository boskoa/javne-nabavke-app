import { Stack } from '@mui/material'
import { MyChip } from '../AppBar/Location'
import FilterSwitch from './FilterSwitch'

const ProceduresFilter = ({ filter, setFilter }) => {
  return (
    <Stack alignItems="start" direction="row" justifyContent="flex-start">
      <MyChip
        label={
          <FilterSwitch
            text="samo moji postupci"
            color="primary"
            setFilter={() => setFilter(!filter)}
          />
        }
        color="chips"
      />
    </Stack>
  )
}

export default ProceduresFilter