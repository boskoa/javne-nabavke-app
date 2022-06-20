import {
  Chart,
  PieSeries,
  Legend,
} from '@devexpress/dx-react-chart-material-ui'
import { Animation } from '@devexpress/dx-react-chart'

const UserChart = ({ procedures }) => {
  const procedureCount = procedures.length
  const percentageFail = (procedures.filter(
    (a) => a.phase === '12 Nismo prošli')
  ).length / procedureCount * 100
  const percentageSuccess = (procedures.filter(
    (a) => a.phase === '10 Isporučeno i fakturisano')
  ).length / procedureCount * 100
  const percentageOngoing = 100 - (percentageFail + percentageSuccess)
  const chartData = [
    { procedures: 'u toku', percentage: percentageOngoing },
    { procedures: 'neuspešno', percentage: percentageFail },
    { procedures: 'prošli', percentage: percentageSuccess }
  ]

  return (
    <Chart data={chartData} height={30} width={290}>
      <PieSeries
        valueField="percentage"
        argumentField="procedures"
        innerRadius={0.6}
      />
      <Animation />
      <Legend />
    </Chart>
  )
}

export default UserChart