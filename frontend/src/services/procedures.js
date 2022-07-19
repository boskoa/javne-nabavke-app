import axios from 'axios'

const baseUrl = '/api/procedures'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const getOne = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response.data
}

const getAllAnalysis = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(`${baseUrl}/analysis`, config)
  return response.data
}

const getForAuthority = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(`${baseUrl}?searchAuthority=${id}`, config)
  return response.data
}

const newProcedure = async (data) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, data, config)
  return response.data
}

const updateOne = async (id, data) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, data, config)
  return response.data
}

const deleteOne = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

export default {
  getAll,
  newProcedure,
  getOne,
  getAllAnalysis,
  getForAuthority,
  updateOne,
  deleteOne,
  setToken
}