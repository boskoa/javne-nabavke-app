import analysis from '../../services/analysis'
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Legend,
} from '@devexpress/dx-react-chart-material-ui'
import { Stack, Animation } from '@devexpress/dx-react-chart'
import Loading from '../Loading'
import { useEffect, useState } from 'react'

const months = [
  'Januar',
  'Februar',
  'Mart',
  'April',
  'Maj',
  'Jun',
  'Jul',
  'Avgust',
  'Septembar',
  'Oktobar',
  'Novembar',
  'Decembar'
]

const Root = (props) => (
  <Legend.Root
    {...props}
    sx={{ display: 'flex', margin: 'auto', flexDirection: 'row' }}
  />
)
const Label = (props) => (
  <Legend.Label {...props} sx={{ whiteSpace: 'nowrap' }} />
)

const ProceduresByMonth = ({ start, end }) => {
  const [dataRaw, setDataRaw] = useState([])

  useEffect(() => {
    analysis
      .getProcsByMonth(start, end)
      .then((response) => setDataRaw(response))
  }, [])

  if (!dataRaw[0]) {
    return <Loading />
  }

  const data = months.map((m) => {
    const creations = dataRaw
      .filter((d) => months[parseInt(d.created_at.slice(5, 7)) - 1] === m)
      .length
    const submissions = dataRaw
      .filter((d) => months[parseInt(new Date(d.submission_date)
        .toISOString().slice(5, 7)) - 1] === m)
      .length

    return { month: m, creations, submissions }
  })

  return (
    <Chart data={data}>
      <ArgumentAxis />
      <ValueAxis />
      <BarSeries
        name="Prema datumu unosa"
        valueField="creations"
        argumentField="month"
        color="orange"
      />
      <BarSeries
        name="Prema datumu predaje"
        valueField="submissions"
        argumentField="month"
        color="teal"
      />
      <Animation />
      <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
      <Stack />
    </Chart>
  )
}

export default ProceduresByMonth