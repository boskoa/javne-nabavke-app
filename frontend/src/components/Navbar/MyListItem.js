import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const MyListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  color: theme.palette.primary.contrastText
}))

const MyListItemText = styled(ListItemText)(({ theme }) => ({
  '& span': {
    marginLeft: '-10px',
    fontWeight: '600',
    fontSize: '0.8em',
    color: theme.palette.primary.contrastText
  },
  [theme.breakpoints.down('md')]: {
    display:'none'
  }
}))

const MyListItem = ({ item }) => {
  const path = useLocation().pathname.slice(1)
  const bgColor = path === item.router.slice(1) ? 'primary.light' : false

  return (
    <ListItem disablePadding sx={{ backgroundColor: bgColor }}>
      <Link
        to={item.router}
        style={{
          color: 'white',
          textDecoration: 'none',
          width: '100%'
        }}
      >
        <ListItemButton>
          <MyListItemIcon>
            {item.icon}
          </MyListItemIcon>
          <MyListItemText
            primaryTypographyProps={{ fontSize: 'small' }}
            primary={<Typography sx={{ ml: -3 }} variant="body2">
              {item.label}
            </Typography>}
          />
        </ListItemButton>
      </Link>
    </ListItem>
  )
}

export default MyListItem