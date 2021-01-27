/* eslint-disable react/prop-types */
import React from 'react'
import Togglable from './Togglable'


const Blog = ({ blog, likeBlog, deleteBlog }) => {

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

  const ref = React.createRef()


  return (
    <div className='blogEntry' id={blog.id} style={blogStyle}>
      <div className='blogTitle' style={blogTitle}>{blog.title}</div>
      <div className='blogAuthor'>{blog.author}</div>

      <Togglable buttonLabel='show details' ref={ref}>
        <div className='blogUrl'>{blog.url}</div>
        <div className='blogLikes'>likes: {blog.likes} <button onClick={likeBlog}>like</button></div>
        <div><button onClick={deleteBlog}>remove</button></div>
      </Togglable>
    </div>
  )

}

export default Blog
