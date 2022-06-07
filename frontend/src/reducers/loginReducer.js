import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import loginServices from '../services/login'

export const loginThunk = createAsyncThunk(
  'login/loginThunk',
  async (credentials) => {
    try {
      const response = await loginServices.login(credentials)
      window.localStorage.setItem('loggedTenderUser', JSON.stringify(response))
      loginServices.setToken(response)
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

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = {}
    },
    login: (state, action) => {
      state.data = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.data = action.payload
    })
  }
})

export const { logout, login } = loginSlice.actions

export default loginSlice.reducer