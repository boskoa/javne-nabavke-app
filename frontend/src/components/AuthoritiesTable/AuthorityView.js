import { Box } from '@mui/material'
import ChartComponent from './ChartComponent'
import AuthorityData from './AuthorityData'
import BarComponent from './BarComponent'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getForAuthority } from '../../reducers/procedureReducer'

const AuthorityView = ({ authorityData }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getForAuthority(authorityData.authorityId))
  }, [])

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
          flexShrink: 1
        }}
      >
        <ChartComponent />
        <AuthorityData authorityData={authorityData} />
      </Box>
      <BarComponent authorityData={authorityData} />
    </div>
  )
}

export default AuthorityView