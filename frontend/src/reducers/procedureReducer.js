import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import procedureService from '../services/procedures'

export const initProcedures = createAsyncThunk(
  'procedure/initProcedures',
  async () => {
    const response = await procedureService.getAll()
    console.log('INIT PROCEDURES', response)
    return response
  }
)

export const newProcedure = createAsyncThunk(
  'procedure/newProcedure',
  async (data) => {
    const response = await procedureService.newProcedure(data)
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
  reducers: {
    clean: (state) => {
      state.data = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(initProcedures.fulfilled, (state, action) => {
      state.data = action.payload
    })
    builder.addCase(newProcedure.fulfilled, (state, action) => {
      state.data = [ ...state.data, action.payload ]
    })
  }
})

export const { clean } = procedureSlice.actions


export default procedureSlice.reducer