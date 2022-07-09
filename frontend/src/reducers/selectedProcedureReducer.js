import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import procedureServices from '../services/procedures'

export const getOneThunk = createAsyncThunk(
  'selectedProcedure/getOneThunk',
  async (id) => {
    try {
      const response = await procedureServices.getOne(id)
      console.log('SELECTED', response)
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
      console.log('RIĐUSER APDEJT', id, data)
      const response = await procedureServices.updateOne(id, data)
      console.log('RIĐUSER APDEJT RESPONSE', response)
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
      console.log('CLEANED', state.data)
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