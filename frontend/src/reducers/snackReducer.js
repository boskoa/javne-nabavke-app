import { createSlice } from '@reduxjs/toolkit'

const snackSlice = createSlice({
  name: 'snack',
  initialState: {
    data: {}
  },
  reducers: {
    removeSnack: (state) => {
      state.data.open = false
    },
    sendSnack: (state, action) => {
      state.data = action.payload
    }
  }
})

export const { removeSnack, sendSnack } = snackSlice.actions

export default snackSlice.reducer