import { Stack, Typography, Switch } from '@mui/material'

const FilterSwitch = ({ setFilter, text, color }) => {
  return (
    <Stack direction="row" spacing={1} justifyContent="right">
      <Switch size="small" onChange={setFilter} color={color} />
      <Typography variant="body1" color="text.secondary">{text}</Typography>
    </Stack>
  )
}

export default FilterSwitch