import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import HomeIcon from '@mui/icons-material/Home'
import ClassIcon from '@mui/icons-material/Class'
import PersonIcon from '@mui/icons-material/Person'
import BusinessIcon from '@mui/icons-material/Business'
import EventIcon from '@mui/icons-material/Event'
import BarChartIcon from '@mui/icons-material/BarChart'
import MyListItem from './MyListItem'
import styled from '@emotion/styled'

export const drawerWidth = 140
export const drawerWidthSm = 60

const MyDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    paddingTop: 70,
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  '& .Mui-selected': {
    color: 'green'
  },
  [theme.breakpoints.down('md')]: {
    width: drawerWidthSm,
    '& .MuiDrawer-paper': {
      width: drawerWidthSm
    }
  }
}))

const Navbar = () => {
  const navbarItems = [
    {
      id: 0,
      icon: <HomeIcon />,
      label: 'Početna',
      router: '/'
    },
    {
      id: 1,
      icon: <ClassIcon />,
      label: 'Postupci',
      router: '/procedures'
    },
    {
      id: 2,
      icon: <PersonIcon />,
      label: 'Korisnici',
      router: '/users'
    },
    {
      id: 3,
      icon: <BusinessIcon />,
      label: 'Ugovorni organi',
      router: '/authorities'
    },
    {
      id: 4,
      icon: <EventIcon />,
      label: 'Podsetnici',
      router: '/notifications'
    },
    {
      id: 5,
      icon: <BarChartIcon />,
      label: 'Analiza',
      router: '/analysis'
    }
  ]

  return (
    <MyDrawer
      variant="permanent"
      anchor="left"
    >
      <List>
        {navbarItems.map((item) => (
          <MyListItem key={item.id} item={item}  />
        ))}
      </List>
    </MyDrawer>
  )
}

export default Navbar