import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import loginServices from '../services/login'

export const loginThunk = createAsyncThunk(
  'login/loginThunk',
  async (credentials) => {
    try {
      const response = await loginServices.login(credentials)
      window.localStorage.setItem('loggedTenderUser', JSON.stringify(response))
      return response
    } catch (exception) {
      console.log('BANNED', exception.response.data)
      return exception.response.data
    }
  }
)

const initialState = {
  status: null,
  data: {}
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = {}
    },
    login: (state, action) => {
      state.data = action.payload
    },
    updateAvatar: (state, action) => {
      state.data.avatar = action.payload.path
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.data = action.payload
    })
  }
})

export const { logout, login, updateAvatar } = loginSlice.actions

export default loginSlice.reducer