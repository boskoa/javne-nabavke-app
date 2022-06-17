import styled from '@emotion/styled'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const MyListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  marginLeft: '0.5em',
  color: theme.palette.secondary.contrastText
}))

const MyListItemText = styled(ListItemText)(({ theme }) => ({
  '& span': {
    marginLeft: '-10px',
    fontWeight: '600',
    fontSize: '0.8em'
  },
  [theme.breakpoints.down('md')]: {
    display:'none'
  }
}))

const MyListItem = ({ item }) => {
  const path = useLocation().pathname.slice(1)
  const bgColor = path === item.router.slice(1) ? 'black' : false

  return (
    <ListItem disablePadding>
      <Link
        to={item.router}
        style={{
          backgroundColor: bgColor,
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
            primary={item.label}
          />
        </ListItemButton>
      </Link>
    </ListItem>
  )
}

export default MyListItem