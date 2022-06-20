import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/users'

const getAllOverview = async () => {
  const response = await axios.get(`${baseUrl}/overview`)
  return response.data
}

export default { getAllOverview }