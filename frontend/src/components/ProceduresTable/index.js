import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { useState, useEffect } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { styled } from '@mui/system'
import { useSelector, useDispatch } from 'react-redux'
import { change } from '../../reducers/pathReducer'

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

/* iskoristiti za pravljenje hitnoća zastavice
function createData(name, code, population, size) {
  const density = population / size
  return { name, code, population, size, density }
}
*/

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
    const date = proc.submissionDate.toString()

    return {
      id: proc.id,
      authority: proc.contractingAuthority.name,
      name: proc.name,
      endDate:
        `${date.slice(0, 10)} ${date.slice(11, 19)}`,
      user: proc.user.name,
      budget: proc.budget,
      phase: proc.phase,
      emergency: proc.id
    }
  }))


  const sortingFunction = (a, b) => (sortAscending
    ? a[`${sortCriterium}`] > b[`${sortCriterium}`]
    : b[`${sortCriterium}`] > a[`${sortCriterium}`])

  const postupci = rows.sort(sortingFunction)
  console.log('POSTUP', postupci)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
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
            {rows
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
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default ProceduresTable