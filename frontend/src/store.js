import { configureStore } from '@reduxjs/toolkit'
import procedureReducer from './reducers/procedureReducer'
import pathReducer from './reducers/pathReducer'
import loginReducer from './reducers/loginReducer'
import snackReducer from './reducers/snackReducer'
import searchReducer from './reducers/searchReducer'
import authorityReducer from './reducers/authorityReducer'
import requirementReducer from './reducers/requirementReducer'
import selectedProcedureReducer from './reducers/selectedProcedureReducer'

export default configureStore({
  reducer: {
    procedure: procedureReducer,
    path: pathReducer,
    login: loginReducer,
    snack: snackReducer,
    search: searchReducer,
    authorities: authorityReducer,
    requirement: requirementReducer,
    selectedProcedure: selectedProcedureReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})