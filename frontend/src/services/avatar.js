import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/avatar'

let token = null

const loggedUserJSON = window.localStorage.getItem('loggedTenderUser')
if (loggedUserJSON) {
  const user = JSON.parse(loggedUserJSON)
  token = `bearer ${user.token}`
}

const uploadAvatar = async (data) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, data, config)
  return response.data
}

export default { uploadAvatar }