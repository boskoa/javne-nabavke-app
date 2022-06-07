import { createSlice } from '@reduxjs/toolkit'

const pathSlice = createSlice({
  name: 'path',
  initialState: {
    value: ''
  },
  reducers: {
    change: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { change } = pathSlice.actions

export default pathSlice.reducer