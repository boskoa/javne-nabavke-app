import * as React from 'react'
import analysis from '../../services/analysis'
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Legend,
} from '@devexpress/dx-react-chart-material-ui'
import { scaleBand } from '@devexpress/dx-chart-core'
import { ArgumentScale, Stack, ValueScale, Animation } from '@devexpress/dx-react-chart'
import { easeBounceOut } from 'd3-ease'
import Loading from '../Loading'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

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
  const loggedIn = useSelector((state) => state.login.data.token)
  //const loggedIn = JSON.parse(window.localStorage.getItem("token"))
  useEffect(() => {
    if (loggedIn) {
      analysis
        .getProcsByUsers(start, end)
        .then((response) => setData(response))
    }
  }, [loggedIn])

  if (!data[0]) {
    return <Loading />
  }

  const finishedData = data.map((d) => {
    const active_count = parseInt(d.active_count)
    const name = d.name
    const success_count = parseInt(d.success_count)
    const total_count = parseInt(d.total_count)
    const unsuccessful_count = parseInt(d.unsuccessful_count)

    return { active_count, name, success_count, total_count, unsuccessful_count }
  })

  console.log('DATA', data, finishedData)

  return (
    <Chart data={finishedData}>
      <ValueScale name="Ukupno postupaka" />
      <ValueScale name="Uspešni postupci" />
      <ValueScale name="Postupci u toku" />
      <ValueScale name="Neuspešni postupci" />
      <ArgumentScale factory={scaleBand} />
      <ArgumentAxis />
      <ValueAxis />

      <BarSeries
        valueField="total_count"
        argumentField="name"
        name="Ukupno postupaka"
      />
      <BarSeries
        valueField="success_count"
        argumentField="name"
        name="Uspešni postupci"
      />
      <BarSeries
        valueField="active_count"
        argumentField="name"
        name="Postupci u toku"
      />
      <BarSeries
        valueField="unsuccessful_count"
        argumentField="name"
        name="Neuspešni postupci"
      />
      <Animation duration={1500} easing={easeBounceOut} />
      <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
      <Stack />
    </Chart>
  )
}

export default ProceduresByUser