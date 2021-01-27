import React from 'react'
import { useSelector } from 'react-redux'

const MessageBox = () => {

  const notification = useSelector(state => state.notifications, () => {})

  return (
    <div id='messageBox' className={notification.style}>
      <b>{notification.text}</b>
    </div>
  )
}

export default MessageBox