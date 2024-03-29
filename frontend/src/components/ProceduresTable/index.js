import {
  Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Stack
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
import { cleanSelected } from '../../reducers/selectedProcedureReducer'
import Filters from './Filters'
import UserChip from './UserChip'

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
    minWidth: 170,
    align: 'center'
  },
  {
    id: 'name',
    label: 'Naziv postupka',
    minWidth: 150,
    align: 'center'
  },
  {
    id: 'endDate',
    label: 'Rok za predaju',
    minWidth: 175,
    align: 'center',
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
    minWidth: 80,
    align: 'right',
    format: (value) => value.toLocaleString('sr-BA', { minimumFractionDigits: 2 })
  },
  {
    id: 'phase',
    label: 'Faza postupka',
    minWidth: 190,
    align: 'center'
  },
  {
    id: 'emergency',
    label: 'Hitnoća',
    minWidth: 50,
    align: 'center'
  }

]

const ProceduresTable = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortCriterium, setSortCriterium] = useState('endDate')
  const [sortAscending, setSortAscending] = useState(false)
  const [userFilter, setUserFilter] = useState(false)
  const [phaseFilter, setPhaseFilter] = useState(false)
  const dispatch = useDispatch()
  const filter = useSelector(state => state.search.value.toLowerCase())

  const user = useSelector((state) => state.login.data.name)
  const loggedIn = useSelector((state) => state.login.data.token)

  useEffect(() => {
    if (loggedIn) {
      dispatch(change('Postupci'))
    }
  }, [loggedIn])

  const rawRows = userFilter
    ? useSelector(state => state.procedure.data).filter((r) => r.user.name === user)
    : useSelector(state => state.procedure.data)

  const inactivePhases = [
    '10 Isporučeno i fakturisano',
    '11 Ne izlazimo',
    '12 Nismo prošli',
    '13 Stopirano'
  ]

  const rawRowsWithPhase = phaseFilter
    ? rawRows.filter((p) => !inactivePhases.includes(p.phase))
    : rawRows

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }

  const rows = rawRowsWithPhase.map((proc) => {
    if (proc.contractingAuthority) {
      const date = proc.submissionDate
        ? new Date(proc.submissionDate).toLocaleDateString('sr-Latn-RS', options)
        : ''

      return {
        id: proc.id,
        authority: proc.contractingAuthority.name,
        name: proc.name,
        endDate: date,
        user: proc.user.name,
        budget: proc.budget,
        phase: proc.phase,
        emergency: proc.phase ? 13 - parseInt(proc.phase.slice(0, 2)) : 13,
        avatar: proc.user.avatar,
        userId: proc.user.id
      }
    }
  })

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
      <Stack sx={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        mb: 1
      }}>
        <Filters
          userFilter={userFilter}
          phaseFilter={phaseFilter}
          setUserFilter={setUserFilter}
          setPhaseFilter={setPhaseFilter}
        />
        <NewProcedureModal />
      </Stack>
      <Paper sx={{ width: '100%', overflow: 'hidden', mb: 5 }}>
        <TableContainer>
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
                                onClick={() => dispatch(cleanSelected())}
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
                        } else if (column.id === 'user') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <UserChip row={row} />
                            </TableCell>
                          )
                        }else {
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
