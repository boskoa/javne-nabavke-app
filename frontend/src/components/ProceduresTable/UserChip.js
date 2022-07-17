import { Avatar, Chip } from '@mui/material'
import { Link } from 'react-router-dom'

const UserChip = ({ row }) => {
  return (
    <Chip
      label={
        <Link
          to={`/userview/${row.userId}`}
          style={{ color: 'inherit', textDecoration: 'none' }}
        >{row.user}</Link>
      }
      size="small"
      color="primary"
      avatar={
        <Avatar src={row.avatar} />
      }
    />
  )
}

export default UserChip