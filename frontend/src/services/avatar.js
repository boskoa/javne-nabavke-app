import axios from 'axios'

const baseUrl = '/api/avatar'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const uploadAvatar = async (data) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, data, config)
  return response.data
}

export default { uploadAvatar, setToken }