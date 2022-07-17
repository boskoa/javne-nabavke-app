import { FormGroup } from '@mui/material'
import DeliveryLocation from './DeliveryLocation'
import Amount from './Amount'
import Budget from './Budget'
import Category from './Category'
import Copy from './Copy'
import Criterion from './Criterion'
import DeliveryDate from './DeliveryDate'
import OfferValidity from './OfferValidity'
import Payment from './Payment'
import SubmissionDate from './SubmissionDate'

const InputData = ({ procedure, userId, isAdmin }) => {
  return (
    <FormGroup>
      <Category procedure={procedure} userId={userId} isAdmin={isAdmin} />
      <Criterion procedure={procedure} userId={userId} isAdmin={isAdmin} />
      <SubmissionDate procedure={procedure} userId={userId} isAdmin={isAdmin} />
      <Budget procedure={procedure} userId={userId} isAdmin={isAdmin} />
      <DeliveryDate procedure={procedure} userId={userId} isAdmin={isAdmin} />
      <DeliveryLocation procedure={procedure} userId={userId} isAdmin={isAdmin} />
      <OfferValidity procedure={procedure} userId={userId} isAdmin={isAdmin} />
      <Payment procedure={procedure} userId={userId} isAdmin={isAdmin} />
      <Copy procedure={procedure} userId={userId} isAdmin={isAdmin} />
      <Amount procedure={procedure} userId={userId} isAdmin={isAdmin} />
    </FormGroup>
  )
}

export default InputData