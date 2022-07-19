import axios from 'axios'

const baseUrl = '/api/requirements'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getByProcedure = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(`${baseUrl}?search=${id}`, config)
  return response.data
}

const addRequirement = async (data) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, data, config)
  return response.data
}

const updateRequirement = async (id, done) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, done, config)
  return response.data
}

const deleteRequirement = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

export default {
  getByProcedure,
  addRequirement,
  updateRequirement,
  deleteRequirement,
  setToken
}