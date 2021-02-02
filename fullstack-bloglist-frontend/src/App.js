import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Button from './components/Button'
import MessageBox from './components/MessageBox'
import NewBlogForm from './components/NewBlogForm'

import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from './reducers/messageReducer'
import { initBlogs } from './reducers/blogsReducer'
import { addBlog } from './reducers/blogsReducer'
import { logIn, logOut } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import UserListing from './components/UserListing'

import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom"

const App = () => {
  // const [blogs, setBlogs] = useState([])

  //implementing redux
  const dispatch = useDispatch()

  const reduxBlogs = useSelector(state => state.blogs, () => { })
  const reduxUser = useSelector(state => state.user, () => { })

  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('BlogUser')
    if (loggedUserJSON) {
      const blogUser = JSON.parse(loggedUserJSON).result
      dispatch(logIn(blogUser))
    }
  }, [])

  const [blogAddForm, setBlogAddForm] = useState(false)

  const signOut = (event) => {
    window.localStorage.clear()
    dispatch(logOut())

  }

  const showAddBlogClicked = (event) => {
    setBlogAddForm(true)
  }


  const createBlog = (newBlog) => {

    dispatch(addBlog(newBlog, reduxUser))
    dispatch(showNotification('BLOG: ' + newBlog.title + ' by ' + newBlog.author + ' added sucesfully!'))
    setBlogAddForm(false)
  }

  const blogList = () => {
    return (
      <div>
        {!blogAddForm && <Button text='add blog' handleClick={showAddBlogClicked} />}
        {blogAddForm && <NewBlogForm createBlog={createBlog} setBlogAddForm={setBlogAddForm} />}
        <div id='blogs'>
          {reduxBlogs.sort((a, b) => { return b.likes - a.likes }).map(blog => {
            if (blog.user.name === reduxUser.name) {
              return (<Blog key={blog.id} blog={blog} loginToken={reduxUser.token} />)
            }
          })}
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="container">
        <h1>blogs</h1>
        <MessageBox />
        {reduxUser === null ?
          <LoginForm /> :
          <div>{reduxUser.name} is logged!!! <Button text='logout' handleClick={signOut} /></div>
        }
        <Switch>
          <Route path="/users">
            {reduxUser !== null && <UserListing />}
          </Route>
          <Route>
            {reduxUser !== null && blogList()}
          </Route>
        </Switch>

      </div>
    </Router>
  )
}

export default App