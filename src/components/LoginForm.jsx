import React from 'react'
import { useState } from 'react'
import loginService from '../services/loginService'
import blogService from '../services/blogService'

const LoginForm = ( { username, password, setUsername, setUser, setPassword, setErrorMessage, setSuccessMessage}) => {

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })
        
            window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(user)
            ) 
            blogService.setToken(user.token)
            setUser(user)
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            setUsername('')
            setPassword('')

            setSuccessMessage(`${user.name} logged in`)

            setTimeout(() => {
                setSuccessMessage(null)
            }, 5000)

            } catch (exception) {
            console.log(exception)
            setErrorMessage('wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
      }

    return (
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>      
      )
}

export default LoginForm