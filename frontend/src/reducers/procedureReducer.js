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

export const getAllAnalysis = createAsyncThunk(
  'procedure/getAllAnalysis',
  async () => {
    const response = await procedureService.getAllAnalysis()
    return response
  }
)

export const getForAuthority = createAsyncThunk(
  'procedure/getForAuthority',
  async (id) => {
    const response = await procedureService.getForAuthority(id)
    return response
  }
)

const initialState = {
  status: null,
  data: [],
  analysis: [],
  forAuthority: []
}

const procedureSlice = createSlice({
  name: 'procedure',
  initialState,
  reducers: {
    clean: (state) => {
      state.data = []
    },
    cleanForAuthority: (state) => {
      state.forAuthority = []
    },
    updateProcedures: (state, action) => {
      state.data = state.data.map((d) => {
        return d.id !== action.payload.id ? d : action.payload
      })
    },
    updateProcedurePhase: (state, action) => {
      let newData = state.data.find((d) => d.id === action.payload.id)
      newData.phase = action.payload.label
      state.data = state.data.map((d) => {
        return d.id !== action.payload.id ? d : newData
      })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(initProcedures.fulfilled, (state, action) => {
      state.data = action.payload
    })
    builder.addCase(newProcedure.fulfilled, (state, action) => {
      state.data = [ ...state.data, action.payload ]
    })
    builder.addCase(getAllAnalysis.fulfilled, (state, action) => {
      state.analysis = action.payload
    })
    builder.addCase(getForAuthority.fulfilled, (state, action) => {
      state.forAuthority = action.payload
    })
  }
})

export const {
  clean, cleanForAuthority, updateProcedures, updateProcedurePhase
} = procedureSlice.actions


export default procedureSlice.reducer