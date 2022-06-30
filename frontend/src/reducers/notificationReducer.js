import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import notificationServices from '../services/notifications'

export const getAllNotificationsThunk = createAsyncThunk(
  'notifications/getAllNotificationsThunk',
  async () => {
    try {
      const response = await notificationServices.getAll()
      console.log('NOTIFICATIONS', response)
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

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllNotificationsThunk.fulfilled, (state, action) => {
      state.data = action.payload
    })
  }
})

export default notificationsSlice.reducer