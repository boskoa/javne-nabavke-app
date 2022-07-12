import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import notificationServices from '../services/notifications'

export const getAllNotificationsThunk = createAsyncThunk(
  'notifications/getAllNotificationsThunk',
  async () => {
    try {
      const response = await notificationServices.getAll()
      return response
    } catch (exception) {
      return exception.response.data
    }
  }
)

export const updateNotificationsThunk = createAsyncThunk(
  'notifications/updateNotificationsThunk',
  async ({ id, done }) => {
    try {
      const newDone = !done
      const response = await notificationServices.updateOne(id, { done: newDone })
      return response
    } catch (exception) {
      return exception.response.data
    }
  }
)

export const updateAlarmThunk = createAsyncThunk(
  'notifications/updateAlarmThunk',
  async ({ id, alarm }) => {
    try {
      const response = await notificationServices.updateOne( id, { alarm })
      console.log('RESULT ALARM', response)
      return response
    } catch (exception) {
      return exception.response.data
    }
  }
)

export const updateDoneThunk = createAsyncThunk(
  'notifications/updateDoneThunk',
  async ({ id, done }) => {
    try {
      const response = await notificationServices.updateOne( id, { done: !done })
      console.log('RESULT DONE', response)
      return response
    } catch (exception) {
      return exception.response.data
    }
  }
)

export const updateTextThunk = createAsyncThunk(
  'notifications/updateTextThunk',
  async ({ id, text }) => {
    try {
      const response = await notificationServices.updateOne( id, { text })
      console.log('RESULT TEXT', response)
      return response
    } catch (exception) {
      return exception.response.data
    }
  }
)

export const addNotificationsThunk = createAsyncThunk(
  'notifications/addNotificationsThunk',
  async (data) => {
    try {
      const response = await notificationServices.addNotification(data)
      console.log('ADDED NOTIFICATION', response)
      return response
    } catch (exception) {
      return exception.response.data
    }
  }
)

export const deleteNotification = createAsyncThunk(
  'requirement/deleteNotification',
  async (id) => {
    console.log('DELETING', id)
    await notificationServices.deleteNotification(id)
    return { id }
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
    builder.addCase(updateNotificationsThunk.fulfilled, (state, action) => {
      state.data = state.data.map((o) => o.id !== action.payload.id ? o : action.payload)
    })
    builder.addCase(updateAlarmThunk.fulfilled, (state, action) => {
      state.data = state.data.map((o) => o.id !== action.payload.id ? o : action.payload)
    })
    builder.addCase(updateDoneThunk.fulfilled, (state, action) => {
      state.data = state.data.map((o) => o.id !== action.payload.id ? o : action.payload)
    })
    builder.addCase(updateTextThunk.fulfilled, (state, action) => {
      state.data = state.data.map((o) => o.id !== action.payload.id ? o : action.payload)
    })
    builder.addCase(addNotificationsThunk.fulfilled, (state, action) => {
      state.data = [ ...state.data, action.payload ]
    })
    builder.addCase(deleteNotification.fulfilled, (state, action) => {
      state.data = state.data.filter((o) => o.id !== action.payload.id)
    })
  }
})

export default notificationsSlice.reducer