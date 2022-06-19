import { useEffect, useState } from 'react'
import { change } from '../../reducers/pathReducer'
import { Box, Stack, Typography } from '@mui/material'
import FilterSwitch from './FilterSwitch'
import { useDispatch, useSelector } from 'react-redux'
import ProceduresReview from './ProceduresReview'


const HomePage = () => {
  const [filter, setFilter] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login.data.name)

  const filter1 = (o) => {
    if (filter) {
      return (o.phase === '04 Napravljena ponuda' && o.user.name === user)
    } else {
      return (o.phase === '04 Napravljena ponuda')
    }
  }
  const filter2 = (o) => {
    if (filter) {
      return (o.phase === '03 Pripremljena prateća dokumentacija'
        || o.phase === '02 Pronađena roba/usluge' && o.user.name === user)
    } else {
      return (o.phase === '03 Pripremljena prateća dokumentacija'
        || o.phase === '02 Pronađena roba/usluge')
    }
  }
  const filter3 = (o) => {
    if (filter) {
      return (o.phase === '01 Pregledana TD' && o.user.name === user)
    } else {
      return (o.phase === '01 Pregledana TD')
    }
  }

  const proceduresForFilter = useSelector((state) => state.procedure.data)
  const procedures1 = proceduresForFilter
    .filter(filter1)
    .slice(0,10)

  const procedures2 = proceduresForFilter
    .filter(filter2)
    .slice(0,10)

  const procedures3 = proceduresForFilter
    .filter(filter3)
    .slice(0,10)

  useEffect(() => {
    dispatch(change('Početna'))
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      <FilterSwitch setFilter={() => setFilter(!filter)} />
      <Stack spacing={2} sx={{ flexWrap: 'wrap' }}>
        <div style={{ marginBottom: 5, backgroundColor: '#A0D995', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ margin: 2, marginBottom: 0 }}>
            Ponude spremne za slanje
          </Typography>
          <ProceduresReview procedures={procedures1} />
        </div>
        <div style={{ marginBottom: 5, backgroundColor: '#6CC4A1', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ margin: 2, marginBottom: 0 }}>
            Pripremljena dokumentacija
          </Typography>
          <ProceduresReview procedures={procedures2} />
        </div>
        <div style={{ marginBottom: 5, backgroundColor: '#4CACBC', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ margin: 2, marginBottom: 0 }}>
            Tek započeti postupci
          </Typography>
          <ProceduresReview procedures={procedures3} />
        </div>
      </Stack>
    </Box>
  )
}

export default HomePage