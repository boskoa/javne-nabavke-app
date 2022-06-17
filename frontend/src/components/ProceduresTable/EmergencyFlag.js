import FlagIcon from '@mui/icons-material/Flag'

const EmergencyFlag = ({ endDate, phase }) => {
  console.log('EMERGENCY', endDate, phase)
  const getColor = () => {
    const now = new Date().getTime()
    const deadline = endDate ? new Date(endDate.slice(0,10)).getTime() : 0
    const days = deadline === 0 ? 20 : ((deadline - now) / 86400000)
    const progress = phase ? parseInt(phase.slice(0,2)) : 1
    console.log(now, deadline, days)
    let color = Math.round(255 - 255/days + progress*10)
    if (color > 230) {
      color = 230
    }
    console.log('COLOR', color)

    return color
  }

  const greenBlue = getColor()

  return (
    <FlagIcon style={{ color: `rgb(255, ${greenBlue}, ${greenBlue})` }} />
  )
}

export default EmergencyFlag