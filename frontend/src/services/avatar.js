import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/avatar'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const uploadAvatar = async (data) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, data, config)
  console.log('AVATARAVATAR', response.data)
  return response.data
}

export default { uploadAvatar, setToken }