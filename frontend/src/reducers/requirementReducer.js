import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import requirementService from '../services/requirements'

export const getByProcedure = createAsyncThunk(
  'requirement/getByProcedure',
  async (id) => {
    const response = await requirementService.getByProcedure(id)
    return response
  }
)

export const addRequirement = createAsyncThunk(
  'requirement/addRequirement',
  async (data) => {
    const response = await requirementService.addRequirement(data)
    return response
  }
)

export const updateRequirement = createAsyncThunk(
  'requirement/updateRequirement',
  async ({ id, reqDone }) => {
    const newDone = !reqDone
    const response = await requirementService.updateRequirement(id, { done: newDone })
    return response
  }
)

export const deleteRequirement = createAsyncThunk(
  'requirement/deleteRequirement',
  async (id) => {
    await requirementService.deleteRequirement(id)
    return { id }
  }
)

const initialState = {
  status: null,
  data: []
}

const requirementSlice = createSlice({
  name: 'requirement',
  initialState,
  reducers: {
    cleanRequirements: (state) => {
      state.data = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getByProcedure.fulfilled, (state, action) => {
      state.data = action.payload
    })
    builder.addCase(addRequirement.fulfilled, (state, action) => {
      state.data = [ ...state.data, action.payload ]
    })
    builder.addCase(updateRequirement.fulfilled, (state, action) => {
      state.data = state.data.map((o) => o.id !== action.payload.id ? o : action.payload)
    })
    builder.addCase(deleteRequirement.fulfilled, (state, action) => {
      state.data = state.data.filter((o) => o.id !== action.payload.id)
    })
  }
})

export const { cleanRequirements } = requirementSlice.actions


export default requirementSlice.reducer