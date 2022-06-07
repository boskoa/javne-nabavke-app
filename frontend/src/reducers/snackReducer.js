import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const sendSnack = createAsyncThunk(
  'snack/sendSnack',
  async (data) => {
    return data
  }
)

const snackSlice = createSlice({
  name: 'snack',
  initialState: {
    data: {}
  },
  reducers: {
    removeSnack: (state) => {
      state.data.open = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(sendSnack.fulfilled, (state, action) => {
      state.data = action.payload
    })
  }
})

export const { removeSnack } = snackSlice.actions

export default snackSlice.reducer