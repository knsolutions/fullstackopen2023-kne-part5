import React from 'react'
import { useState } from 'react'
import blogService from '../services/blogService'


const BlogForm = ( { setErrorMessage, setSuccessMessage, blogFormRef, blogs, setBlogs, user }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log('submit')
        try {

            const response = await blogService.create({ title, author, url })

            console.log("Added blog:", response)
            setSuccessMessage(`Added blog: ${response.title} by ${response.author}`)

            response.user = { username: user.username, name: user.name, id: response.id }

            setBlogs(blogs.concat(response))

            setTimeout(() => {
                setSuccessMessage(null)
            }, 5000)

            setTitle('')
            setAuthor('')
            setUrl('')
            blogFormRef.current.toggleVisibility()

        } catch (exception) {
            console.log(exception)

            setErrorMessage('Error adding blog')

            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    title:
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                author:
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                url:
                    <input
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>

        </div>
    )
}

export default BlogForm