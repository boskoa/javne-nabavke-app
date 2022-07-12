import axios from 'axios'

const baseUrl = '/api/authorities'

const getAll = async (query) => {
  const response = await axios.get(`${baseUrl}?search=${query}`)
  return response.data
}

const newAuthority = async (data) => {
  const response = await axios.post(baseUrl, data)
  return response.data
}

export default { getAll, newAuthority }