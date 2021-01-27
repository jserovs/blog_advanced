import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Button from './components/Button'
import MessageBox from './components/MessageBox'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import userService from './services/users'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification, showError, clearNotification } from './reducers/messageReducer'
import { fetchBlogs } from './reducers/blogsReducer'
import { addBlog } from './reducers/blogsReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])

  //implementing redux
  const dispatch = useDispatch()
  const reduxBlogs = useSelector(state => state.blogs, () => {})

  useEffect(() => {    
    blogService.getAll().then(blogs => {
      dispatch(fetchBlogs(blogs))
      setBlogs(blogs)
    }
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('BlogUser')
    if (loggedUserJSON) {

      const blogUser = JSON.parse(loggedUserJSON)
      setUser(blogUser.name)
      setLoginToken(blogUser.token)
    }
  }, [])

  // userThat is logged in
  const [user, setUser] = useState(null)
  // token for user
  const [loginToken, setLoginToken] = useState()

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [blogAddForm, setBlogAddForm] = useState(false)

  // const [message, setMessage] = useState({ text: null, style: '' })

  const handleUserNameChange = (event) => {
    setUserName(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const likeBlog = (blog) => {
    blogService.likeBlog(blog, 1, loginToken)
      .then((postCall) => {
        console.log(JSON.stringify(postCall))
        const copy = [...blogs]
        copy[copy.findIndex((element) => element.id === blog.id)].likes++
        setBlogs(copy)
      })
  }

  const deleteBlog = (blog) => {
    blogService.deleteBlog(blog, loginToken)
      .then((deleteCall) => {
        console.log(JSON.stringify(deleteCall))
        const copy = [...blogs]
        copy.splice(copy.findIndex((element) => element.id === blog.id), 1)
        setBlogs(copy)
      })
  }

  const loginButtonClicked = (event) => {
    event.preventDefault()

    userService.postLogin(userName, password)
      .then(result => {
        setUser(result.name)
        setLoginToken(result.token)
        window.localStorage.setItem('BlogUser', JSON.stringify({ username: userName, name: result.name, token: result.token }))
        dispatch(clearNotification())
      })
      .catch(error => {
        console.log(error)
        dispatch(showError('Wrong credentials'))
        // setMessage({ text: 'Wrong credentials', style: 'error' })
      })

  }

  const logoutButtonClicked = (event) => {
    event.preventDefault()

    setUser(null)
    setLoginToken()
    window.localStorage.clear()

  }

  const addBlogClicked = (event) => {
    event.preventDefault()

    setBlogAddForm(true)
  }

  const createBlog = (newBlog) => {

    const loggedUserJSON = window.localStorage.getItem('BlogUser')
    if (loggedUserJSON) {

      var blogUser = JSON.parse(loggedUserJSON)
    }

    blogService.saveBlog(newBlog.title, newBlog.author, newBlog.url, loginToken)
      .then((result) => {
        newBlog = {
          id: result.id,
          title: result.title,
          author: result.author,
          url: result.url,
          likes: 0,
          user: {
            username: blogUser.username,
            name: blogUser.name,
            id: result.user
          }
        }
        console.log(newBlog);
        dispatch(addBlog(newBlog))
        // setBlogs([...blogs,newBlog])
        dispatch(showNotification('BLOG: ' + result.title + ' by ' + result.author + ' added sucesfully!'))
        // setMessage({ text: 'BLOG: ' + result.title + ' by ' + result.author + ' added sucesfully!', style: 'notification' })
        setBlogAddForm(false)
      })

      .catch(error => {
        console.log(error)
        dispatch(showError('blog could not be added'))
        // setMessage({ text: 'blog could not be added', style: 'error' })
      })
  }

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <form>
          <div>
            username: <input id='username' type='text' value={userName} onChange={handleUserNameChange} />
          </div>
          <div>
            password: <input id= 'password' type='password' value={password} onChange={handlePasswordChange} />
          </div>
          <div>
            <Button text='Login' handleClick={loginButtonClicked} />
          </div>
        </form>
      </div>
    )
  }

  const blogList = () => {
    return (
      <div>
        {!blogAddForm && <Button text='add blog' handleClick={addBlogClicked} />}
        {blogAddForm && <NewBlogForm createBlog={createBlog} setBlogAddForm={setBlogAddForm} />}
        <div id='blogs'>
          {reduxBlogs.sort((a,b) => { return b.likes - a.likes }).map(blog => {
            if (blog.user.name === user) {
              return (<Blog key={blog.id} blog={blog} likeBlog={() => likeBlog(blog)} deleteBlog={() => deleteBlog(blog)} />)
            }
          }
          )}
        </div>
      </div>
    )
  }



  return (
    <div>

      <h1>blogs</h1>
      <MessageBox/>
      {user === null ?
        loginForm() :
        <div>{user} is logged!!! <Button text='logout' handleClick={logoutButtonClicked} /></div>
      }

      {user !== null && blogList()}

    </div>
  )
}

export default App