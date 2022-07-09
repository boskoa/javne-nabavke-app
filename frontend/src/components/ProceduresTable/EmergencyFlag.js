import FlagIcon from '@mui/icons-material/Flag'
import useColor from '../../hooks/useColor'

const EmergencyFlag = ({ endDate, phase }) => {
  const [r, g, b] = useColor(endDate, phase)

  return (
    <FlagIcon style={{ color: `rgb(${r}, ${g}, ${b})` }} />
  )
}

export default EmergencyFlag