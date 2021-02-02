/* eslint-disable react/prop-types */
import React from 'react'
// import Togglable from './Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogsReducer'


const Blog = ({ loginToken }) => {

  const id = useParams().id
  console.log (id)
  const dispatch = useDispatch()
  const reduxBlogs = useSelector(state => state.blogs, () => { })

  const blog = reduxBlogs.find((blog) => { console.log("blogid=" + blog.id); return blog.id === id })

  console.log (blog)

  if (!blog) {
    return <div>not found</div>
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogTitle = {
    fontWeight: 'bold'
  }

  // const ref = React.createRef()


  return (
    <div className='blogEntry' id={blog.id} style={blogStyle}>
      <div className='blogTitle' style={blogTitle}>{blog.title}</div>
      <div className='blogAuthor'>{blog.author}</div>

      {/* <Togglable buttonLabel='show details' ref={ref}> */}
      <div className='blogUrl'>{blog.url}</div>
      <div className='blogLikes'>likes: {blog.likes} <button onClick={() => dispatch(likeBlog(blog, loginToken))} >like</button></div>
      <div><button onClick={() => dispatch(removeBlog(blog, loginToken))}>remove</button></div>
      {/* </Togglable> */}
    </div>
  )

}

export default Blog
