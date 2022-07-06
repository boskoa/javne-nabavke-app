import { Card, CardActions, CardContent, Button, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { Link } from 'react-router-dom'

const MyCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column'
})

const formatter = new Intl.NumberFormat('sr-Latn-BA', {
  style: 'currency',
  currency: 'BAM',
})

const ProcedureCard = ({ p }) => {
  return (
    <MyCard sx={{ maxWidth: 345, m: 2 }}>
      <CardContent>
        <Typography gutterBottom variant="body1" component="div">
          {p.contractingAuthority.name}
        </Typography>
        <Typography component="span" variant="body2" color="text.secondary">
          <p>{p.name}</p>
          <p>{formatter.format(p.budget)}</p>
          <p>{p.user.name}</p>
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Link
          to={`/procedures/${p.id}`}
          style={{ color: 'black', textDecoration: 'none' }}
        >
          <Button size="small" sx={{ fontSize: 12 }}>Otvori</Button>
        </Link>
        <Link
          to={`/userview/${p.user.id}`}
        >
          <Button size="small" sx={{ fontSize: 12 }}>Korisnik</Button>
        </Link>
      </CardActions>
    </MyCard>
  )
}

export default ProcedureCard