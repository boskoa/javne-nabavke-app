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

const initialState = {
  status: null,
  data: []
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllOverviewThunk.fulfilled, (state, action) => {
      state.data = action.payload
    })
  }
})

export default usersSlice.reducer