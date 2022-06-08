import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    value: ''
  },
  reducers: {
    searchString: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { searchString } = searchSlice.actions

export default searchSlice.reducer