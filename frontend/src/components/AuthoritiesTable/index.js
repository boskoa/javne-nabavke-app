import {
  Box, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow
} from '@mui/material'
import AuthorityView from './AuthorityView'
import { useState, useEffect } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { styled } from '@mui/system'
import { useSelector, useDispatch } from 'react-redux'
import { change } from '../../reducers/pathReducer'
import { cleanForAuthority, getAllAnalysis } from '../../reducers/procedureReducer'

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
    id: 'numOfProcedures',
    label: 'Broj postupka',
    minWidth: 150,
    align: 'center'
  },
  {
    id: 'numOfSuccesses',
    label: 'Broj dobijenih postupaka',
    minWidth: 170,
    align: 'center'
  },
  {
    id: 'value',
    label: 'Ukupna vrednost postupaka',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('sr-SR', { minimumFractionDigits: 2 })
  }
]

const style = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  position: 'absolute',
  top: '100%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '70%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  m: 1,
  borderRadius: 2
}

const AuthoritiesTable = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortCriterium, setSortCriterium] = useState('endDate') //staviti ključ "rok za predaju"
  const [sortAscending, setSortAscending] = useState(false)
  const [authorityData, setAuthorityData] = useState({})
  const dispatch = useDispatch()
  const filter = useSelector(state => state.search.value.toLowerCase())
  console.log(filter)

  useEffect(() => {
    dispatch(change('Ugovorni organi'))
    dispatch(getAllAnalysis())
  }, [])

  const data = useSelector(state => state.procedure.analysis)
  if (!data) {
    return <div>Loading...</div>
  }

  const rows = data.map((d) => {
    return {
      authorityId: d.id,
      authorityJib: d.jib,
      authority: d.name,
      procedureDate: d.created_at,
      numOfProcedures: parseInt(d.procedure_count),
      numOfSuccesses: parseInt(d.success_count),
      value: d.total_amount
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
    <div style={{ position: 'relative' }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflow: 'scroll', m: 1 }}
      >
        <Box sx={style}>
          <AuthorityView authorityData={authorityData} />
        </Box>
      </Modal>
      <Box>
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
                  .filter((a) => a.authority.toLowerCase().includes(filter))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.authorityId}>
                        {columns.map((column) => {
                          const value = row[column.id]
                          if (column.id === 'authority') {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <span
                                  onClick={() => {
                                    handleOpen()
                                    setAuthorityData(row)
                                    dispatch(cleanForAuthority())
                                  }}
                                  style={{ color: 'black', textDecoration: 'none', cursor: 'pointer' }}
                                >
                                  {value}
                                </span>
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
    </div>
  )
}

export default AuthoritiesTable