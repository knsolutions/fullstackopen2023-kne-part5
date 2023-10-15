import axios from 'axios'
//const baseUrl = '/api/login'

// import baseurl from vite .env file

const loginUrl = import.meta.env.VITE_BASE_URL + '/api/login'

const login = async credentials => {
    const response = await axios.post(loginUrl, credentials)
    //console.log('login response', response.data)
    return response.data
}

const logout =  (setUser) => {

    console.log('logout')

    setUser(null)
    window.localStorage.removeItem(
        'loggedBlogappUser'
    )

}

export default { login, logout }