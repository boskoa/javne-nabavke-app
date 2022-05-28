const procedureReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_PROCEDURES':
    return action.data
  default:
    return state
  }
}

export const initProcedures = (procedures) => {
  return {
    data: procedures,
    type: 'INIT_PROCEDURES'
  }
}

export default procedureReducer