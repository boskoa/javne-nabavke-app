import { IconButton, Tooltip } from '@mui/material'
import { Link } from 'react-router-dom'
import SettingsIcon from '@mui/icons-material/Settings'

const SettingsButton = ({ user }) => {
  if (!user) {
    return <div />
  }

  return (
    <Link
      to={`/account-settings/${user.id}`}
      style={{
        color: 'inherit', textDecoration: 'none', position: 'absolute', top: 0, right: 0
      }}
    >
      <IconButton
        size="small"
        color="error"
        sx={{ mr: 1 }}
      >
        <Tooltip title={`Podešavanja korisničkog naloga korisnika ${user.name}`}>
          <SettingsIcon />
        </Tooltip>
      </IconButton>
    </Link>
  )
}

export default SettingsButton