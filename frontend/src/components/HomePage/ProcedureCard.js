import { Card, CardActions, CardContent, Button, Typography } from '@mui/material'
import { styled } from '@mui/system'

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
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button size="small" sx={{ fontSize: 12 }}>Otvori</Button>
        <Button size="small" sx={{ fontSize: 12 }}>Korisnik</Button>
      </CardActions>
    </MyCard>
  )
}

export default ProcedureCard