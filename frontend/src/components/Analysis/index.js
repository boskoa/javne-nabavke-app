import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { change } from '../../reducers/pathReducer'
import AnalysisDatePicker from './AnalysisDatePicker'
import ProceduresByMonth from './ProceduresByMonth'
import ProceduresByUser from './ProceduresByUser'

const Analysis = () => {
  const year = new Date().getFullYear()
  const [start, setStart] = useState(new Date(year, 0, 1))
  const [end, setEnd] = useState(Date())
  const [expanded, setExpanded] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(change('Analiza'))
  }, [])

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div>
      <AnalysisDatePicker start={start} setStart={setStart} end={end} setEnd={setEnd} />
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
        TransitionProps={{ unmountOnExit: true }}
        sx={{ minWidth: 800 }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Broj postupaka po mesecu
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Pregled broja postupaka u svakom mesecu za odabrani period,
            prema datumu unosa postupka i roku za predaju ponude.
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ProceduresByMonth start={start} end={end} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
        TransitionProps={{ unmountOnExit: true }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Broj postupaka po korisnicima
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Ukupan broj postupaka, broj uspešnih, neuspešnih i postupaka u toku
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ProceduresByUser start={start} end={end} />
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default Analysis