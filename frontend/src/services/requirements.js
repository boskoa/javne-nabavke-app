import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/requirements'

const getByProcedure = async (id) => {
  const response = await axios.get(`${baseUrl}?search=${id}`)
  return response.data
}

const addRequirement = async (data) => {
  const response = await axios.post(baseUrl, data)
  return response.data
}

const updateRequirement = async (id, done) => {
  const response = await axios.put(`${baseUrl}/${id}`, done)
  return response.data
}

const deleteRequirement = async (id) => {
  await axios.delete(`${baseUrl}/${id}`)
}

export default {
  getByProcedure,
  addRequirement,
  updateRequirement,
  deleteRequirement
}