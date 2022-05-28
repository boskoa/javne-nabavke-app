import { createStore, combineReducers } from 'redux'
import procedureReducer from './reducers/procedureReducer'

const reducer = combineReducers({
  procedureReducer
})

const store = createStore(reducer)

export default store