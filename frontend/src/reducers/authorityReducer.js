import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authoritiesServices from '../services/authorities'

export const getAllThunk = createAsyncThunk(
  'authorities/getAllThunk',
  async (query) => {
    try {
      const response = await authoritiesServices.getAll(query)
      return response
    } catch (exception) {
      return exception.response.data
    }
  }
)

export const newAuthorityThunk = createAsyncThunk(
  'authorities/newAuthorityThunk',
  async (data) => {
    try {
      const response = await authoritiesServices.newAuthority(data)
      console.log('NEW AUTHORITY THUNK')
      return response
    } catch (exception) {
      return exception.response.data
    }
  }
)

const initialState = {
  status: null,
  data: []
}

const authoritiesSlice = createSlice({
  name: 'authorities',
  initialState,
  reducers: {/*
    getAll: (state, action) => {
      state.data = action.payload
    }*/
  },
  extraReducers: (builder) => {
    builder.addCase(getAllThunk.fulfilled, (state, action) => {
      state.data = action.payload
    })
    builder.addCase(newAuthorityThunk.fulfilled, (state, action) => {
      state.data = [ ...state.data, action.payload ]
    })
  }
})

//export const { getAll } = authoritiesSlice.actions

export default authoritiesSlice.reducer