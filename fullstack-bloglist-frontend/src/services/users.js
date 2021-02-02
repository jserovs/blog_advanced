import axios from 'axios'
const getAllUsers = '/api/users'
const loginAPI = '/api/login'

const getAll = () => {
  const request = axios.get(getAllUsers)
  return request.then(response => response.data)
}

const postLogin = (username, password) => {

  const request = axios.post(loginAPI, {
    username: username,
    password: password
  })  
  return request.then((response) => {console.log(response); return response.data})
}

export default { getAll, postLogin }