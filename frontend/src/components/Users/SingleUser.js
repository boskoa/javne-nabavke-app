import styled from '@emotion/styled'
import { Avatar, Paper, Stack, Box } from '@mui/material'
import UserChart from './UserChart'
import UserData from './UserData'

const MyPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: 1,
  backgroundColor: theme.palette.custom.contrastText,
  marginBottom: 30,
  marginRight: 30
}))

const SingleUser = ({ user }) => {
  const thisYear = new Date().getFullYear().toString()
  const procedures = user.procedures
    ? user.procedures.filter((p) => p.createdAt.slice(0,4) === thisYear)
    : []

  return (
    <MyPaper
      elevation={10}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        p: 1,
        mb: 3,
        mr: 3
      }}
    >
      <Stack sx={{ flexDirection: 'row' }}>
        <Avatar
          sx={{
            backgroundColor: 'custom.contrastText',
            height: '8rem',
            width: '8rem',
            mr: 3, mb: 3, ml: 1, mt: 1
          }}
          src={user.avatar}
        />
        <UserData user={user} procedures={procedures} />
      </Stack>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
          flexGrow: 1,
          flexShrink: 1,
          height: '10rem'
        }}
      >
        <UserChart procedures={user.procedures} />
      </Box>
    </MyPaper>
  )
}

export default SingleUser
