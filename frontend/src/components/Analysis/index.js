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

const Analysis = () => {
  const year = new Date().getFullYear()
  const [start, setStart] = useState(new Date(year, 0, 1))
  const [end, setEnd] = useState(Date())
  const [expanded, setExpanded] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(change('Analiza'))
  }, [])

  useEffect(() => {
    console.log(start)
  }, [start])

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
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Prolaznost - UO</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Prolaznost na postupcima kod izabranog ugovornog organa
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
            varius pulvinar diam eros in elit. Pellentesque convallis laoreet
            laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Prolaznost - korisnici
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Prolaznost na postupcima po izabranom korisniku
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Prosečna vrednost ugovora
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Pregled prosečne vrednosti ugovora za sve korisnike
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default Analysis