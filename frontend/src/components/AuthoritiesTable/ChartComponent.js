import {
  Chart,
  PieSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui'
import { Animation } from '@devexpress/dx-react-chart'
import { Paper } from '@mui/material'
import { useSelector } from 'react-redux'

const ChartComponent = () => {
  const proceduresFromAuthority = useSelector((state) => state.procedure.forAuthority)

  if (!proceduresFromAuthority) {
    return <div>Loading</div>
  }

  console.log('PROCEDURES', proceduresFromAuthority)
  const procedureCount = proceduresFromAuthority.length
  console.log('COUNT D MANI', procedureCount)
  const percentageFail = (proceduresFromAuthority.filter(
    (a) => a.phase === 'nismo prošli')
  ).length / procedureCount * 100
  const percentageSuccess = (proceduresFromAuthority.filter(
    (a) => a.phase === 'fakturisano')
  ).length / procedureCount * 100
  const percentageOngoing = 100 - (percentageFail + percentageSuccess)
  console.log('PERCENTAGE', percentageFail, percentageOngoing, percentageSuccess)
  const chartData = [
    { procedures: 'u toku', percentage: percentageOngoing },
    { procedures: 'nismo prošli', percentage: percentageFail },
    { procedures: 'prošli', percentage: percentageSuccess }
  ]

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        flexGrow: 1,
        margin: 1
      }}
    >
      <Chart data={chartData}>
        <PieSeries
          valueField="percentage"
          argumentField="procedures"
          innerRadius={0.6}
        />
        <Title text="Uspeh na dosadašnjim postupcima" />
        <Animation />
        <Legend />
      </Chart>
    </Paper>
  )
}

export default ChartComponent