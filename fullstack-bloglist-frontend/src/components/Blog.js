/* eslint-disable react/prop-types */
import React, {useState} from 'react'
// import Togglable from './Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Button from './Button'
import { commentBlog, likeBlog, removeBlog } from '../reducers/blogsReducer'


const Blog = ({ loginToken }) => {

  const [comment, setComment] = useState('');

  const id = useParams().id
  const dispatch = useDispatch()
  const reduxBlogs = useSelector(state => state.blogs, () => { })

  const blog = reduxBlogs.find((blog) => blog.id === id )

  if (!blog) {
    return <div>not found</div>
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const addCommentClicked = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog, comment))
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
      <h3>Comments</h3>
      <form>
          <div>
            <input id='comment' type='text' value={comment} onChange={handleCommentChange} />
          </div>
          <div>
            <Button text='Add comment' handleClick={addCommentClicked} />
          </div>
        </form>
      {blog.comments.map((element, index)  => { return <li key={index}>{element}</li> })}
    </div>
  )

}

export default Blog
