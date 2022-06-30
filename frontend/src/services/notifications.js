import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/notifications'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  console.log('SERVIS NOTE', config)

  const response = await axios.get(baseUrl, config)
  console.log('SERVIS RISPONS', response.data)
  return response.data
}

export default { getAll, setToken }