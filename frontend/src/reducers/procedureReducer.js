import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import procedureService from '../services/procedures'

export const initProcedures = createAsyncThunk(
  'procedure/initProcedures',
  async () => {
    const response = await procedureService.getAll()
    console.log(response)
    return response
  }
)

const initialState = {
  status: null,
  data: []
}

const procedureSlice = createSlice({
  name: 'procedure',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initProcedures.fulfilled, (state, action) => {
      state.data = action.payload
    })
  }
})

export default procedureSlice.reducer