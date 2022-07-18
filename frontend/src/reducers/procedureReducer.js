import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import procedureService from '../services/procedures'

export const initProcedures = createAsyncThunk(
  'procedure/initProcedures',
  async () => {
    const response = await procedureService.getAll()
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

export const deleteOneProcedureThunk = createAsyncThunk(
  'procedure/deleteOneProcedureThunk',
  async (id) => {
    await procedureService.deleteOne(id)
    return id
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
        const newValues = action.payload.data
        const newProcedure = { ...d, ...newValues }
        return d.id !== action.payload.id ? d : newProcedure
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
    builder.addCase(deleteOneProcedureThunk.fulfilled, (state, action) => {
      console.log('PEJLOAD', action.payload)
      state.data = state.data.filter((p) => p.id !== action.payload)
    })
  }
})

export const {
  clean, cleanForAuthority, updateProcedures, updateProcedurePhase
} = procedureSlice.actions


export default procedureSlice.reducer