import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/users'

const register = async (credentials) => {
  console.log('AXIOS', credentials)
  const response = await axios.post(baseUrl, credentials)
  console.log('AXIOS RESPONSE', response)
  return response.data
}

export default register