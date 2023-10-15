import axios from 'axios'

const blogUrl = import.meta.env.VITE_BASE_URL + '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(blogUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(blogUrl, newObject, config)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${blogUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${blogUrl}/${id}`, config)
  return request.then(response => response.data)
}

export default { 
  getAll, create, update, setToken, remove
}

