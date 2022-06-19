import { Stack, Typography, Switch } from '@mui/material'

const FilterSwitch = ({ setFilter }) => {
  return (
    <Stack direction="row" spacing={1} justifyContent="right">
      <Switch size="small" onChange={setFilter} />
      <Typography color="text.secondary">samo moji postupci</Typography>
    </Stack>
  )
}

export default FilterSwitch