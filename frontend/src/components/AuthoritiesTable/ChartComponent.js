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

  const procedureCount = proceduresFromAuthority.length
  const percentageFail = (proceduresFromAuthority.filter(
    (a) => a.phase === '11 Ne izlazimo'
      || a.phase === '12 Nismo prošli'
      || a.phase === '13 Stopirano'
  )
  ).length / procedureCount * 100
  const percentageSuccess = (proceduresFromAuthority.filter(
    (a) => a.phase === '10 Isporučeno i fakturisano')
  ).length / procedureCount * 100
  const percentageOngoing = 100 - (percentageFail + percentageSuccess)
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