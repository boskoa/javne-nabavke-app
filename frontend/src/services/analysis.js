import axios from 'axios'

const baseUrl = '/api/analysis'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getProcsByMonth = async (start, end) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.get(
    `${baseUrl}/procs-by-month?start=${start}&end=${end}`, config
  )
  return response.data
}

const getProcsByUsers = async (start, end) => {
  const config = {
    headers: { Authorization: token },
  }

  console.log(start, end)

  const response = await axios.get(
    `${baseUrl}/procs-by-users?start=${start}&end=${end}`, config
  )
  console.log(response)
  return response.data
}

export default { getProcsByMonth, getProcsByUsers, setToken }