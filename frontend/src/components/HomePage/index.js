import { useEffect } from 'react'
import { change } from '../../reducers/pathReducer'
import { Typography } from '@mui/material'
import { useDispatch } from 'react-redux'


const HomePage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(change('Početna'))
  }, [])

  return (
    <Typography paragraph>
      Welcome to Homepage!
    </Typography>
  )
}

export default HomePage