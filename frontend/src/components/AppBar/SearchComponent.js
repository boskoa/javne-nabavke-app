import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import { IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { searchString } from '../../reducers/searchReducer'

const Search = styled('div', {
  shouldForwardProp: (prop) => prop !== 'showSearch'
})(({ theme, showSearch }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.custom.main, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.custom.main, 0.25)
  },
  color: theme.palette.custom.contrastText,
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: 400,
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    display: showSearch ? 'flex' : 'none',
    width: '100%'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const CloseIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5, 2),
  width: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 'auto',
  [theme.breakpoints.up('sm')]: {
    display: 'none'
  }
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
}))

const SearchComponent = ({ showSearch, setShowSearch }) => {
  const dispatch = useDispatch()
  const path = useSelector((state) => state.path.value)

  const disabled = path && [
    'Početna', 'Analiza', 'Podešava', 'Korisnik', 'Pregled'
  ].includes(path.slice(0, 8))
    ? true
    : false

  return (
    <Search showSearch={showSearch}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        disabled={disabled}
        placeholder="Pretraga..."
        inputProps={{ 'aria-label': 'search' }}
        fullWidth
        onChange={(e) => dispatch(searchString(e.target.value))}
      />
      <CloseIconButton
        size="small"
        color="inherit"
        style={{ verticalAlign: 'middle' }}
        onClick={() => setShowSearch(false)}
      >
        <CloseIcon />
      </CloseIconButton>
    </Search>
  )
}

export default SearchComponent