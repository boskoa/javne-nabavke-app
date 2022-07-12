import { FormGroup } from '@mui/material'
import DeliveryLocation from '../../DeliveryLocation'
import Amount from './Amount'
import Budget from './Budget'
import Category from './Category'
import Copy from './Copy'
import Criterion from './Criterion'
import DeliveryDate from './DeliveryDate'
import OfferValidity from './OfferValidity'
import Payment from './Payment'
import SubmissionDate from './SubmissionDate'

const InputData = ({ procedure, userId }) => {
  return (
    <FormGroup>
      <Category procedure={procedure} userId={userId} />
      <Criterion procedure={procedure} userId={userId} />
      <SubmissionDate procedure={procedure} userId={userId} />
      <Budget procedure={procedure} userId={userId} />
      <DeliveryDate procedure={procedure} userId={userId} />
      <DeliveryLocation procedure={procedure} userId={userId} />
      <OfferValidity procedure={procedure} userId={userId} />
      <Payment procedure={procedure} userId={userId} />
      <Copy procedure={procedure} userId={userId} />
      <Amount procedure={procedure} userId={userId} />
    </FormGroup>
  )
}

export default InputData