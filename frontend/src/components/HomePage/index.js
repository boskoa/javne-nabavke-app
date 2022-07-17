import { useEffect, useState } from 'react'
import { change } from '../../reducers/pathReducer'
import { Box, Stack, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import ProceduresReview from './ProceduresReview'
import styled from '@emotion/styled'
import ProceduresFilter from './ProceduresFIlter'

const MyBox = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  borderRadius: 2
}))


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
      return ((o.phase === '03 Pripremljena prateća dokumentacija'
        || o.phase === '02 Pronađena roba/usluge') && o.user.name === user)
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
      <ProceduresFilter filter={filter} setFilter={setFilter} />
      <Stack spacing={2} sx={{ flexWrap: 'wrap', mt: 1 }}>
        <MyBox sx={{ backgroundColor: 'boxes.light' }}>
          <Typography variant="h6" sx={{ margin: 2 }}>
            Ponude spremne za slanje
          </Typography>
          <ProceduresReview procedures={procedures1} />
        </MyBox>
        <MyBox sx={{ backgroundColor: 'boxes.main' }}>
          <Typography variant="h6" sx={{ margin: 2 }}>
            Pripremljena dokumentacija
          </Typography>
          <ProceduresReview procedures={procedures2} />
        </MyBox>
        <MyBox sx={{ backgroundColor: 'boxes.dark' }}>
          <Typography variant="h6" sx={{ margin: 2 }}>
            Tek započeti postupci
          </Typography>
          <ProceduresReview procedures={procedures3} />
        </MyBox>
      </Stack>
    </Box>
  )
}

export default HomePage