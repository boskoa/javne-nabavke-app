import { Card, CardActions, CardContent, Button, Typography, Box } from '@mui/material'

const ProcedureCard = ({ p }) => {
  console.log('PREZENTACIJA', p)

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <Box sx={{ backgroundColor: 'green', height: '30%' }} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {p.contractingAuthority.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <p>{p.name}</p>
          <p>{p.budget}</p>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default ProcedureCard