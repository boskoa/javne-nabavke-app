import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/procedures'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  console.log('TOKENTOKEN', token)
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const newProcedure = async (data) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log('PREPROCEDURE', config.headers)
  const response = await axios.post(baseUrl, data, config)
  console.log('NEW PROCEDURE', response, config.headers)
  return response.data
}

export default {
  getAll,
  newProcedure,
  getOne,
  setToken
}