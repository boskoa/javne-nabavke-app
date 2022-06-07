import { configureStore } from '@reduxjs/toolkit'
import procedureReducer from './reducers/procedureReducer'
import pathReducer from './reducers/pathReducer'
import loginReducer from './reducers/loginReducer'
import snackReducer from './reducers/snackReducer'

export default configureStore({
  reducer: {
    procedure: procedureReducer,
    path: pathReducer,
    login: loginReducer,
    snack: snackReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})