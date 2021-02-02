/* eslint-disable react/prop-types */
import React, { useState } from 'react'
// import Togglable from './Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
// import CustButton from './CustButton'
import { FormControl, Button, ListGroup, InputGroup, Card } from 'react-bootstrap'
import { commentBlog, likeBlog, removeBlog } from '../reducers/blogsReducer'


const Blog = ({ loginToken }) => {

  const [comment, setComment] = useState('');

  const id = useParams().id
  const dispatch = useDispatch()
  const reduxBlogs = useSelector(state => state.blogs, () => { })

  const blog = reduxBlogs.find((blog) => blog.id === id)

  if (!blog) {
    return <div>not found</div>
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const addCommentClicked = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog, comment))
    setComment('')
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    // border: 'solid',
    borderWidth: 0,
    marginBottom: 5
  }

  const blogTitle = {
    fontWeight: 'bold'
  }

  // const ref = React.createRef()


  return (
    <div>
      <Card >
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{blog.author}</Card.Subtitle>
          <Card.Text>likes: {blog.likes} <Button size="sm" variant="success" onClick={() => dispatch(likeBlog(blog, loginToken))} >like</Button></Card.Text>
          <Card.Link href="{blog.url}">Go To</Card.Link>
        </Card.Body>
      </Card>
      <h3>Comments</h3>
      <form>
        <div>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Your blog comment"
              aria-describedby="basic-addon2"
              value={comment} onChange={handleCommentChange}
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={addCommentClicked}>Comment</Button>
            </InputGroup.Append>
          </InputGroup>

        </div>
      </form>
      <ListGroup variant='flush'>
        {blog.comments.map((element, index) => { return <ListGroup.Item key={index}>{element}</ListGroup.Item> })}
      </ListGroup>
    </div>

  )

}

export default Blog
