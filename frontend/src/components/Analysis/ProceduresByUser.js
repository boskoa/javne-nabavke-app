import analysis from '../../services/analysis'
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Legend,
} from '@devexpress/dx-react-chart-material-ui'
import { Stack } from '@devexpress/dx-react-chart'
import Loading from '../Loading'
import { useEffect, useState } from 'react'

const Root = (props) => (
  <Legend.Root
    {...props}
    sx={{ display: 'flex', margin: 'auto', flexDirection: 'row' }}
  />
)
const Label = (props) => (
  <Legend.Label {...props} sx={{ whiteSpace: 'nowrap' }} />
)

const ProceduresByUser = ({ start, end }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    analysis
      .getProcsByUsers(start, end)
      .then((response) => setData(response))
  }, [])

  if (!data[0]) {
    return <Loading />
  }

  console.log('DATA', data)

  return (
    <Chart data={data}>
      <ArgumentAxis />
      <ValueAxis />
      <BarSeries
        name="Ukupno postupaka"
        valueField="total_count"
        argumentField="name"
        color="orange"
      />
      <BarSeries
        name="Uspešni postupci"
        valueField="success_count"
        argumentField="name"
        color="green"
      />
      <BarSeries
        name="Postupci u toku"
        valueField="active_count"
        argumentField="name"
        color="blue"
      />
      <BarSeries
        name="Neuspešni postupci"
        valueField="unsuccessful_count"
        argumentField="name"
        color="red"
      />
      <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
      <Stack />
    </Chart>
  )
}

export default ProceduresByUser