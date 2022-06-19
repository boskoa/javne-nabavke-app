import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis
} from '@devexpress/dx-react-chart-material-ui'
import { Animation } from '@devexpress/dx-react-chart'
import { Paper } from '@mui/material'
import { useSelector } from 'react-redux'

const BarComponent = () => {
  const proceduresFromAuthority = useSelector((state) => state.procedure.forAuthority)

  if (!proceduresFromAuthority) {
    return <div>Loading</div>
  }

  let barDatan = {} //isprazniti
  const datesLong = proceduresFromAuthority.map((a) => a.createdAt)
  const dates = datesLong.map((d) => d.slice(0,4))
  for (let i = 0; i < dates.length; i++) {
    const date = dates[i]
    if (!barDatan[date]) {
      barDatan[date] = 1
    } else {
      barDatan[date] += 1
    }
  }

  let barData = []

  for (const property in barDatan) {
    barData.push({ year: property, amount: barDatan[property] })
  }

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        flexShrink: 1,
        margin: 1
      }}
    >
      <Chart data={barData}>
        <ArgumentAxis />
        <ValueAxis max={7} />
        <BarSeries valueField="amount" argumentField="year" />
        <Title text="Broj postupaka po godinama" />
        <Animation />
      </Chart>
    </Paper>
  )
}

export default BarComponent