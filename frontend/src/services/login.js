import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/login'

let token = null //moraće u state, da bi mogao pristup u više servisa; ne može se izvoziti

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  console.log('TOKENTOKEN', token)
}

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login, setToken, token }