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

export const updateOneThunk = createAsyncThunk(
  'procedure/updateOne',
  async ({ id, label }) => {
    try {
      const phase = { phase: label }
      console.log('RIĐUSER APDEJT', id, label, phase)
      const response = await procedureServices.updateOne(id, phase)
      return response
    } catch (exception) {
      return exception.response.data
    }
  }
)

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
    })
    builder.addCase(updateOneThunk.fulfilled, (state, action) => {
      state.data = { ...state.data, phase: action.payload.phase }
    })
  }
})

export default authoritiesSlice.reducer