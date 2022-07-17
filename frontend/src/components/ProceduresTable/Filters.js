import { Stack } from '@mui/material'
import { MyChip } from '../AppBar/Location'
import FilterSwitch from '../HomePage/FilterSwitch'

const Filters = ({ userFilter, phaseFilter, setUserFilter, setPhaseFilter }) => {
  return (
    <Stack alignItems="start" direction="row" justifyContent="flex-start">
      <MyChip
        label={
          <FilterSwitch
            text="samo moji postupci"
            color="primary"
            setFilter={() => setUserFilter(!userFilter)}
          />
        }
        color="chips"
      />
      <MyChip
        label={
          <FilterSwitch
            text="samo aktivni postupci"
            color="secondary"
            setFilter={() => setPhaseFilter(!phaseFilter)}
          />
        }
        color="chips"
      />
    </Stack>
  )
}

export default Filters