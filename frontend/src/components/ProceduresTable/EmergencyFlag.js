import FlagIcon from '@mui/icons-material/Flag'
import { Tooltip } from '@mui/material'
import useColor from '../../hooks/useColor'

const EmergencyFlag = ({ endDate, phase }) => {
  const [r, g, b, tt] = useColor(endDate, phase)

  return (
    <Tooltip title={tt}>
      <FlagIcon style={{ color: `rgb(${r}, ${g}, ${b})` }} />
    </Tooltip>
  )
}

export default EmergencyFlag