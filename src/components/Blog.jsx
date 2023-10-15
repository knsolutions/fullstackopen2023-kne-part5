import Togglable from './Togglable'
import blogService from '../services/blogService'

const blogStyle = {
    padding: '10px',
    border: '2px solid #ccc',
    marginBottom: '10px',
    backgroundColor: '#f8f8f8',
}




const Blog = ({ blog, setBlogs, blogs, user }) => {

    const handleLike = async (blog) => {
        console.log('Adding like')

        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1
        }

        const response = await blogService.update(blog.id, updatedBlog)

        response.user = { username: blog.user? blog.user.username: null, name: blog.user? blog.user.name: null, id: response.id }

        console.log('response:', response)

        setBlogs(blogs.map(b => b.id !== blog.id ? b : response))
    }

    const handleRemove = async (blog) => {
        console.log('Removing blog')

        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            const response = await blogService.remove(blog.id)
            console.log('response:', response)
            setBlogs(blogs.filter(b => b.id !== blog.id))
        }
    }

    return (
        <div style={blogStyle}>
            {blog.title} {blog.author}
            <Togglable buttonLabelOpen="view" buttonLabelClose="hide">
                <p>{blog.url}</p>
                <p>{blog.likes} <button onClick={() => handleLike(blog)}>like</button></p>
                <p>{blog.user? blog.user.username :"" }</p>
                {user && blog.user && user.username === blog.user.username?
                    <button onClick={() => handleRemove(blog)}>remove</button>: ""}
            </Togglable>
        </div>
    )
}

export default Blog