import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import usersServices from '../services/users'

export const getAllOverviewThunk = createAsyncThunk(
  'users/getAllOverviewThunk',
  async () => {
    try {
      const response = await usersServices.getAllOverview()
      console.log('USERS', response)
      return response
    } catch (exception) {
      return exception.response.data
    }
  }
)

export const getOneUserThunk = createAsyncThunk(
  'users/getOneUserThunk',
  async (id) => {
    try {
      const response = await usersServices.getOne(id)
      console.log('ONE USER', response)
      return response
    } catch (exception) {
      return exception.response.data
    }
  }
)

const initialState = {
  status: null,
  data: [],
  currentUser: {}
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllOverviewThunk.fulfilled, (state, action) => {
      state.data = action.payload
    })
    builder.addCase(getOneUserThunk.fulfilled, (state, action) => {
      console.log('RIĐUSER KARENT JUZER', action.payload)
      state.currentUser = action.payload
    })
  }
})

export default usersSlice.reducer