import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepButton from '@mui/material/StepButton'
import Paper from '@mui/material/Paper'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateOneThunk } from '../../reducers/selectedProcedureReducer'
import { updateProcedurePhase } from '../../reducers/procedureReducer'

const PhaseStepperView = ({ procedure, userId, isAdmin }) => {
  const steps = [
    '01 Pregledana TD',
    '02 Pronađena roba/usluge',
    '03 Pripremljena prateća dokumentacija',
    '04 Napravljena ponuda',
    '05 Poslata ponuda',
    '06 Zakazana eAukcija',
    '07 Dostavljeni dokazi i ostalo',
    '08 Dostavljen potpisan ugovor (i garancija)',
    '09 Roba/usluga dobavljena',
    '10 Isporučeno i fakturisano',
    '11 Ne izlazimo',
    '12 Nismo prošli',
    '13 Stopirano'
  ]

  const completedList = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ]

  const [completed, setCompleted] = useState(completedList)
  const dispatch = useDispatch()
  const currentStep = procedure.phase ? parseInt(procedure.phase.slice(0,2)) - 1 : -1

  useEffect(() => {
    handleCompleted(currentStep)
  }, [])

  const handleCompleted = async (index) => {
    const newCompleted = completed.map((c, i) => {
      return i !== index ? false : !c
    })
    setCompleted(newCompleted)
  }

  const handleComplete = async (index, label) => {
    handleCompleted(index)
    const data = { id: procedure.id, data: { phase: label } }
    if (procedure.user.id === userId || isAdmin) {
      dispatch(updateOneThunk(data))
      dispatch(updateProcedurePhase({ id: procedure.id, label }))
    }
  }

  return (
    <Paper
      elevation={10}
      sx={{ p: 1, width: '100%' }}
    >
      <Stepper nonLinear activeStep={-1} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton
              color="inherit"
              onClick={() => {
                handleComplete(index, label)
              }}
            >
              {label.slice(3)}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Paper>
  )
}

export default PhaseStepperView