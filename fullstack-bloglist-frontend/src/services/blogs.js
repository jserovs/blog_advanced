import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const saveBlog = (title, author, url, userToken) => {

  console.log (title)
  const request = axios.post(baseUrl, {
    title: title,
    author: author,
    url: url
  }, {
    headers: {
      'Authorization': 'Bearer ' + userToken
    }
  })

  return request.then(response => response.data)
}

const commentBlog = (blog, comment) => {

  const request = axios.post(baseUrl + '/'+blog.id+'/comment',
    { comment: comment })

  return request.then(response => response.data)

}

const likeBlog = (blog, like, userToken) => {

  const request = axios.put(baseUrl + '/'+blog.id,
    { likes: blog.likes + like },
    {
      headers: {
        'Authorization': 'Bearer ' + userToken
      }
    })

  return request.then(response => response.data)

}


const deleteBlog = (blog, userToken) => {

  const request = axios.delete(baseUrl + '/'+blog.id,
    {
      headers: {
        'Authorization': 'Bearer ' + userToken
      }
    })

  return request.then(response => response.data)

}
export default { getAll, saveBlog, likeBlog, deleteBlog, commentBlog }