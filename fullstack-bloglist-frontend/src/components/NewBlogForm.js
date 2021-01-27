import React, { useState } from 'react'
import Button from './Button'
import PropTypes from 'prop-types'



const NewBlogForm = ({ createBlog, setBlogAddForm }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const newBlogSave = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    // resetting inputs to empty
    setAuthor('')
    setTitle('')
    setUrl('')

  }

  return (
    <form>
      <div className="titleInput">
        title:<input id='title' name="title" type="text" value={title || ''} onChange={e => setTitle(e.target.value)} />
      </div>
      <div className="authorInput">
        author:<input id='author' name="author" type="text" value={author || ''} onChange={e => setAuthor(e.target.value)} />
      </div>
      <div className="urlInput">
        url:<input id='url' name="url" type="text" value={url || ''} onChange={e => setUrl(e.target.value)} />
      </div>
      <Button text='save' handleClick={newBlogSave} />
      <Button text='cancel' handleClick={() => setBlogAddForm(false)} />
    </form>
  )

}

NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  setBlogAddForm: PropTypes.func.isRequired
}

export default NewBlogForm
