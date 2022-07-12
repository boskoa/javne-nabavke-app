import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import usersServices from '../services/users'

export const getAllOverviewThunk = createAsyncThunk(
  'users/getAllOverviewThunk',
  async () => {
    try {
      const response = await usersServices.getAllOverview()
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
      return response
    } catch (exception) {
      return exception.response.data
    }
  }
)

export const getSelectedUserThunk = createAsyncThunk(
  'users/getSelectedUserThunk',
  async (id) => {
    try {
      const response = await usersServices.getOne(id)
      return response
    } catch (exception) {
      return exception.response.data
    }
  }
)

const initialState = {
  status: null,
  data: [],
  currentUser: {},
  selectedUser: {}
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
      state.currentUser = action.payload
    })
    builder.addCase(getSelectedUserThunk.fulfilled, (state, action) => {
      state.selectedUser = action.payload
    })
  }
})

export default usersSlice.reducer