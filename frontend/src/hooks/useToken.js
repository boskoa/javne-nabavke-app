import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const useToken = () => {
  const [token, setToken] = useState('')
  const userToken = useSelector((state) => state.login.data.token)

  useEffect(() => {
    const tokenWithBearer = `bearer ${userToken}`
    setToken(tokenWithBearer)
  }, [userToken])

  return token
}

export default  useToken

/*
dispatch(getAllNotificationsThunk(token))
*
const getAllThunk = createAsyncThunk({
  'notifications/getAllNotificationsThunk',
  async (token) => {
    try {
      const response = await notificationServices.getAll(token)
      return response
    } catch (exception) {
      return exception.response.data
    }
  }
})
*
const getAll = async (token) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.get(baseUrl, config)
  return response.data
}
*/