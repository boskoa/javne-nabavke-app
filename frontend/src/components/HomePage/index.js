import { useEffect } from 'react'
import { change } from '../../reducers/pathReducer'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import ProceduresReview from './ProceduresReview'


const HomePage = () => {
  const dispatch = useDispatch()
  const proceduresForFilter = useSelector((state) => state.procedure.data)
  const procedures = proceduresForFilter
    .filter((p) => p.budget !== null)
    .sort((a, b) => a.budget < b.budget)
    .slice(0,10)
  console.log('HOOOOOMEEE', procedures)

  useEffect(() => {
    dispatch(change('Početna'))
  }, [])

  return (
    <Box>
      <ProceduresReview procedures={procedures} />
    </Box>
  )
}

export default HomePage