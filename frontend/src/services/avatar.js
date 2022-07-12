import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/avatar'
/*
const token = `bearer ${JSON.parse(window.localStorage.getItem('loggedTenderUser')).token}`
*/
let token = null

const loggedUserJSON = window.localStorage.getItem('loggedTenderUser')
if (loggedUserJSON) {
  const user = JSON.parse(loggedUserJSON)
  token = `bearer ${user.token}`
}
/*
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}
*/
const uploadAvatar = async (data) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, data, config)
  console.log('AVATARAVATAR', response.data)
  return response.data
}

export default { uploadAvatar }