import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const MessageBox = () => {

  const notification = useSelector(state => state.notifications, () => {})

  return (
    <div className="container">
      {(notification && 
        <Alert variant={notification.style}>{notification.text}</Alert>
      )}
    </div>
  )
}

export default MessageBox