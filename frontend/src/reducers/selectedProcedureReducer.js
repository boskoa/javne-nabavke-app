import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import procedureServices from '../services/procedures'

export const getOneThunk = createAsyncThunk(
  'selectedProcedure/getOneThunk',
  async (id) => {
    try {
      const response = await procedureServices.getOne(id)
      console.log('SELECTED', response)
      return response
    } catch (exception) {
      return exception.response.data
    }
  }
)
/*
export const updateOneThunk = createAsyncThunk(
  'selectedProcedure/updateOneThunk',
  async (data) => {
    try {
      const response = await procedureServices.getOne(data)
      return response
    } catch (exception) {
      return exception.response.data
    }
  }
)
*/
const initialState = {
  status: null,
  data: {}
}

const authoritiesSlice = createSlice({
  name: 'selectedProcedure',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOneThunk.fulfilled, (state, action) => {
      state.data = action.payload
    })/*
    builder.addCase(updateOneThunk.fulfilled, (state, action) => {
      state.data = [ ...state.data, action.payload ]
    })*/
  }
})

export default authoritiesSlice.reducer