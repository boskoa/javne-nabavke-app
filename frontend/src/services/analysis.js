import axios from 'axios'

const baseUrl = '/api/analysis'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getProcsByMonth = async (startRaw, endRaw) => {
  const config = {
    headers: { Authorization: token },
  }

  const start = encodeURIComponent(startRaw)
  const end = encodeURIComponent(endRaw)

  const response = await axios.get(
    `${baseUrl}/procs-by-month?start=${start}&end=${end}`, config
  )

  return response.data
}

const getProcsByUsers = async (startRaw, endRaw) => {
  const config = {
    headers: { Authorization: token },
  }

  const start = encodeURIComponent(startRaw)
  const end = encodeURIComponent(endRaw)

  const response = await axios.get(
    `${baseUrl}/procs-by-users?start=${start}&end=${end}`, config
  )

  return response.data
}

export default { getProcsByMonth, getProcsByUsers, setToken }