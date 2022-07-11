import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import loginServices from '../services/login'
import proceduresServices from '../services/procedures'
import avatarServices from '../services/avatar'
import notificationServices from '../services/notifications'

export const loginThunk = createAsyncThunk(
  'login/loginThunk',
  async (credentials) => {
    try {
      const response = await loginServices.login(credentials)
      window.localStorage.setItem('loggedTenderUser', JSON.stringify(response))
      proceduresServices.setToken(response)
      avatarServices.setToken(response)
      notificationServices.setToken(response)

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
      console.log('LOGIIIIIIIIIIN', action.payload, state.data.avatar)
    },
    updateAvatar: (state, action) => {
      console.log('GLAVATAAAAAAAR', action.payload.path, state.data.avatar)
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