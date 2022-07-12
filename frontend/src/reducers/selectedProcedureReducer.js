import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import procedureServices from '../services/procedures'

export const getOneThunk = createAsyncThunk(
  'selectedProcedure/getOneThunk',
  async (id) => {
    try {
      const response = await procedureServices.getOne(id)
      return response
    } catch (exception) {
      return exception.response.data
    }
  }
)

export const updateOneThunk = createAsyncThunk(
  'procedure/updateOne',
  async ({ id, data }) => {
    try {
      const response = await procedureServices.updateOne(id, data)
      return response
    } catch (exception) {
      return exception.response.data
    }
  }
)

const initialState = {
  status: null,
  data: {}
}

const selectedSlice = createSlice({
  name: 'selectedProcedure',
  initialState,
  reducers: {
    cleanSelected: (state) => {
      state.data = {}
    },
    createNotifications: (state, action) => {
      state.data.notifications = [action.payload]
    },
    removeNotifications: (state) => {
      state.data.notifications = []
    },
    changeNotificationText: (state, action) => {
      state.data.notifications[0].text = action.payload.text
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getOneThunk.fulfilled, (state, action) => {
      state.data = action.payload
    })
    builder.addCase(updateOneThunk.fulfilled, (state, action) => {
      state.data = action.payload
    })
  }
})

export const {
  cleanSelected, createNotifications, removeNotifications, changeNotificationText
} = selectedSlice.actions

export default selectedSlice.reducer