import React from 'react'
import { useParams } from "react-router-dom"

const UserDetails = ({ users }) => {
  const id = useParams().id;
  const user = users.find((user) => { return user.id === id })

  if (!user) {
    return null
  }

  return (
    <div>

      <h2>{user.name}</h2>

      <p>added blogs</p>

      { user.blogs.map((blog, index) => {
        return <li key={index}>{blog.title}</li>
      })}
    </div>
  )
}

export default UserDetails
