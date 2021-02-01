import React, { useState } from 'react'
import Button from './Button'
import userService from '../services/users'
import { useDispatch } from 'react-redux'
import { logIn } from '../reducers/userReducer'
import { showError, clearNotification } from '../reducers/messageReducer'

const LoginForm = () => {


    const dispatch = useDispatch()

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const handleUserNameChange = (event) => {
        setUserName(event.target.value)
      }
    
      const handlePasswordChange = (event) => {
        setPassword(event.target.value)
      }
    
      const loginButtonClicked = (event) => {
        event.preventDefault()
    
        userService.postLogin(userName, password)
          .then(result => {
            dispatch(logIn(result))
            window.localStorage.setItem('BlogUser', JSON.stringify({ result }))
            dispatch(clearNotification())
          })
          .catch(error => {
            console.log(error)
            dispatch(showError('Wrong credentials'))
          })
    
      }    
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


  export default LoginForm