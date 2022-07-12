import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/notifications'

let token = null

const loggedUserJSON = window.localStorage.getItem('loggedTenderUser')
if (loggedUserJSON) {
  const user = JSON.parse(loggedUserJSON)
  token = `bearer ${user.token}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.get(baseUrl, config)
  return response.data
}

const updateOne = async (id, data) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, data, config)
  return response.data
}

const deleteNotification = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

const addNotification = async (data) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, data, config)
  return response.data
}

export default {
  getAll, updateOne, deleteNotification, addNotification
}