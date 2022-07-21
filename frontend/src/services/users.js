import axios from 'axios'

const baseUrl = '/api/users'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAllOverview = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(`${baseUrl}/overview`, config)
  return response.data
}

const getOne = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response.data
}

const updateOne = async (id, data) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, data, config)
  return response.data
}

export default { getAllOverview, getOne, updateOne, setToken }