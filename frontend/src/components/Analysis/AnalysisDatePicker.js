import { Stack, TextField, Box } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'

const AnalysisDatePicker = ({ start, setStart, end, setEnd }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="space-between"
      >
        <Box sx={{ mb: 2 }}>
          <DesktopDatePicker
            label="Početni datum"
            inputFormat="MM/dd/yyyy"
            value={start}
            onChange={(newValue) => setStart(newValue)}
            renderInput={(params) => <TextField {...params} />}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <DesktopDatePicker
            label="Krajnji datum"
            inputFormat="MM/dd/yyyy"
            value={end}
            onChange={(newValue) => setEnd(newValue)}
            renderInput={(params) => <TextField {...params} />}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </Stack>
    </LocalizationProvider>
  )
}

export default AnalysisDatePicker