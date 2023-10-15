import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogService'
import loginService from './services/loginService'
import './App.css'

const ErrorNotification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }

const SuccessNotification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="success">
        {message}
        </div>
    )
}

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const blogFormRef = useRef()


  
useEffect(() => {
    const fetchData = async () => {
          const response = await blogService.getAll();
          console.log("response:", response);
          setBlogs(response);
    }
    fetchData()
}, [])

useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
}, [])

const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);



return (
    <div>
        <h2>Blogs</h2>
        <SuccessNotification message={successMessage} />
        <ErrorNotification message={errorMessage} />
        {!user &&
            <LoginForm 
                username={username} 
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                setUser={setUser}
                setErrorMessage={setErrorMessage}
                setSuccessMessage={setSuccessMessage}
            />
        }
        {user && 
            <div>
                <p>{user.name} logged in</p>
                <button onClick={() => { loginService.logout(setUser) }}>
                    logout
                </button>
                <Togglable buttonLabelOpen="new blog" buttonLabelClose="cancel" ref={blogFormRef}>
                    <h3>Create new</h3>
                    <BlogForm
                        setErrorMessage={setErrorMessage}
                        setSuccessMessage={setSuccessMessage}
                        blogFormRef={blogFormRef}
                        setBlogs={setBlogs}
                        blogs={blogs}
                        user={user}
                    />
                </Togglable>
                
                <h3>Current blogs</h3>
                {sortedBlogs.map(blog =>
                <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} user={user}/>
                )}
            </div>
        }
    </div>
  )
}

export default App