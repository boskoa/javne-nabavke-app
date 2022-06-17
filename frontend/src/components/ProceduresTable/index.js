import {
  Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow
} from '@mui/material'
import { useState, useEffect } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { styled } from '@mui/system'
import { useSelector, useDispatch } from 'react-redux'
import { change } from '../../reducers/pathReducer'
import NewProcedureModal from './NewProcedureModal'
import { Link } from 'react-router-dom'
import EmergencyFlag from './EmergencyFlag'

const ColumnLabel = styled('span')({
  '&:hover': {
    color: 'blue',
    cursor: 'pointer'
  }
})

const columns = [
  {
    id: 'authority',
    label: 'Ugovorni organ',
    minWidth: 170
  },
  {
    id: 'name',
    label: 'Naziv postupka',
    minWidth: 150
  },
  {
    id: 'endDate',
    label: 'Rok za predaju',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'user',
    label: 'Referent',
    minWidth: 100,
    align: 'center'
  },
  {
    id: 'budget',
    label: 'Budžet',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('sr-SR', { minimumFractionDigits: 2 })
  },
  {
    id: 'phase',
    label: 'Faza postupka',
    minWidth: 170,
    align: 'center'
  },
  { //Napraviti zastavicu sa nijansom crvene u zavisnosti od rednog broja faze i datuma predaje
  // rgb(255-(faza*(1/broj faza) / dana do predaje). 0, 0)
  // ako je predato - plavo
  // ako je fakturisano/gotovo - zeleno
    id: 'emergency',
    label: 'Hitnoća',
    minWidth: 50,
    align: 'center'
  }

]

const ProceduresTable = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortCriterium, setSortCriterium] = useState('endDate') //staviti ključ "rok za predaju"
  const [sortAscending, setSortAscending] = useState(false)
  const dispatch = useDispatch()
  const filter = useSelector(state => state.search.value.toLowerCase())
  console.log(filter)

  useEffect(() => {
    dispatch(change('Postupci'))
  }, [])

  const rows = useSelector(state => state.procedure.data.map((proc) => {
    if (proc.contractingAuthority) {
      const date = proc.submissionDate ? proc.submissionDate.toString() : ''

      return {
        id: proc.id,
        authority: proc.contractingAuthority.name,
        name: proc.name,
        endDate:
        `${date.slice(0, 10)} ${date.slice(11, 19)}`,
        user: proc.user.name,
        budget: proc.budget,
        phase: proc.phase,
        emergency: `${date.slice(0, 10)} ${date.slice(11, 19)}` //prilagoditi da bude prema vrednosti zelene/plave
      }
    }
  }))


  const sortingFunction = (a, b) => (sortAscending
    ? a[`${sortCriterium}`] > b[`${sortCriterium}`]
    : b[`${sortCriterium}`] > a[`${sortCriterium}`])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Box>
      <NewProcedureModal />
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align='center'
                    style={{ minWidth: column.minWidth }}
                    onClick={() => {
                      setSortCriterium(column.id)
                      setSortAscending(!sortAscending)
                      console.log(sortAscending, sortCriterium)
                    }}
                  >
                    <ColumnLabel>{column.label}</ColumnLabel>
                    {column.id === sortCriterium ? (
                      sortAscending ? (
                        <KeyboardArrowUpIcon sx={{ position: 'absolute' }} />
                      ) : (
                        <KeyboardArrowDownIcon sx={{ position: 'absolute' }} />
                      )
                    ) : null}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows[0] && rows
                .sort(sortingFunction)
                .filter((p) => p.name.toLowerCase().includes(filter)
                || p.user.toLowerCase().includes(filter)
                || p.authority.toLowerCase().includes(filter))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id]
                        if (column.id === 'name') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Link
                                to={`/procedures/${row.id}`}
                                style={{ color: 'black', textDecoration: 'none' }}
                              >
                                {value}
                              </Link>
                            </TableCell>
                          )
                        } else if (column.id === 'emergency') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <EmergencyFlag endDate={row.endDate} phase={row.phase} />
                            </TableCell>
                          )
                        } else {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          )
                        }
                      })}
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage='Redova po stranici'
          labelDisplayedRows={ ({ from, to, count }) => {
            return `${from}–${to} od ${count !== -1 ? count : `više od ${to}`}` }
          }
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}

export default ProceduresTable