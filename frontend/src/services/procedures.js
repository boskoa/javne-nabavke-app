import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/procedures'
/*
const token = `bearer ${JSON.parse(window.localStorage.getItem('loggedTenderUser')).token}`
*/
let token = null

const loggedUserJSON = window.localStorage.getItem('loggedTenderUser')
if (loggedUserJSON) {
  const user = JSON.parse(loggedUserJSON)
  token = `bearer ${user.token}`
}
/*
const setToken = (newToken) => {
  token = `bearer ${newToken}`
  console.log('TOKENTOKEN', token)
}
*/
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const getAllAnalysis = async () => {
  const response = await axios.get(`${baseUrl}/analysis`)
  return response.data
}

const getForAuthority = async (id) => {
  const response = await axios.get(`${baseUrl}?searchAuthority=${id}`)
  return response.data
}

const newProcedure = async (data) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, data, config)
  return response.data
}

const updateOne = async (id, data) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, data, config)
  return response.data
}

export default {
  getAll,
  newProcedure,
  getOne,
  getAllAnalysis,
  getForAuthority,
  updateOne
}