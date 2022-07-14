import { IconButton, Badge, ClickAwayListener, MenuItem, Divider, Typography } from '@mui/material'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOneUserThunk } from '../../../reducers/userReducer'
import { MyMenu } from './ProfileIcon'

const MyPendingActions = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch()

  const open = Boolean(anchorEl)

  useEffect(() => {
    if (user?.id) {
      dispatch(getOneUserThunk(user.id))
    }
  }, [user])

  const currentUser = useSelector((state) => state.users.currentUser)

  if (!currentUser?.procedures) {
    return <div />
  }

  const activeProcedures = currentUser.procedures
    .filter((p) => !(p.phase) || (Number(p.phase.slice(0, 2)) < 5))

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <IconButton
      size="small"
      color="inherit"
      sx={{ mr: 1 }}
      onClick={handleClick}
    >
      <ClickAwayListener onClickAway={handleClose}>
        <Badge max={99} badgeContent={activeProcedures.length} color="error">
          <PendingActionsIcon />
        </Badge>
      </ClickAwayListener>
      <MyMenu
        id="pending-actions-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem disabled>
          <Typography variant="body2" sx={{ color: 'black' }}>
            Neposlate ponude
          </Typography>
        </MenuItem>
        <Divider />
        {activeProcedures.map((p) => {
          return (
            <MenuItem onClick={handleClose} key={p.id}>
              <Link to={`/procedures/${p.id}`} style={{ textDecoration: 'none' }}>
                <Typography variant="body2" sx={{ color: 'custom.contrastText' }}>
                  {`${
                    p.contractingAuthority.name
                  } - ${
                    p.name
                  } | ${
                    p.submissionDate.slice(4, 21)
                  }
                `}
                </Typography>
              </Link>
            </MenuItem>
          )
        }
        )}
      </MyMenu>
    </IconButton>
  )
}

export default MyPendingActions