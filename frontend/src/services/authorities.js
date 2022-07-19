import axios from 'axios'

const baseUrl = '/api/authorities'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async (query) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.get(`${baseUrl}?search=${query}`, config)
  return response.data
}

const newAuthority = async (data) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, data, config)
  return response.data
}

export default { getAll, newAuthority, setToken }