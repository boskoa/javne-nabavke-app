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

export const drawerWidth = 190
export const drawerWidthSm = 75

const MyDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  paddingTop: 10,
  '& .MuiDrawer-paper': {
    paddingTop: 10,
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  },
  '& .Mui-selected': {
    color: 'red'
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
      router: 'route'
    },
    {
      id: 3,
      icon: <BusinessIcon />,
      label: 'Ugovorni organi',
      router: 'route'
    },
    {
      id: 4,
      icon: <EventIcon />,
      label: 'Podsetnici',
      router: 'route'
    },
    {
      id: 5,
      icon: <BarChartIcon />,
      label: 'Analiza',
      router: 'route'
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