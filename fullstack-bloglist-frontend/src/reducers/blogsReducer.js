import blogService from '../services/blogs'

const initialState = []

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case 'INIT_BLOGS':
            return payload.blogs

        case 'ADD_BLOG':
            console.log ("reducer" + JSON.stringify(payload))
            return [...state, payload.blog]

        case 'LIKE_BLOG':
            return state.map((item) => {
                if (item.id === payload.blog.id) {
                    return {
                        ...item,
                        likes: item.likes + 1
                    }
                }
                return item
            })

        case 'REMOVE_BLOG':
            return state.filter(blog => blog.id !== payload.blog.id)

        case 'GET_BLOGS':
            return state
            
        default:
            return state
    }
}

export default reducer

export const initBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            payload: {
                blogs
            }
        })
    }
}

export const addBlog = (blog, addUser) => {
    return async dispatch => {
        const result = await blogService.saveBlog(blog.title, blog.author, blog.url, addUser.token);
        const userId = result.user
        result.user= {
            username: addUser.username,
            name: addUser.name,
            id: userId
        }
        dispatch({
            type: 'ADD_BLOG',
            payload: {
                blog: result
            }
        })
    }
}

export const likeBlog = (blog, token) => {
    return async dispatch => {
        await blogService.likeBlog(blog, 1, token)
        dispatch({
            type: 'LIKE_BLOG',
            payload: {
                blog
            }
        })
    }
}

export const removeBlog = (blog, token) => {
    return async dispatch => {
        await blogService.deleteBlog(blog, token)
        dispatch({
            type: 'REMOVE_BLOG',
            payload: {
                blog
            }
        })
    }
}


