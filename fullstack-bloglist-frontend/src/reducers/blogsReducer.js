const initialState = []

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case 'FETCH_BLOGS':
        return payload.blogs
    case 'ADD_BLOG':
        return [...state, payload.blog]
    default:
        return state
    }
}

export const fetchBlogs = (blogs) => {
    return {
        type: 'FETCH_BLOGS',
        payload: {
            blogs
        }
    }
}

export const addBlog = (blog) => {

    console.log('ADD_BLOG'+ blog);
    return {
        type: 'ADD_BLOG',
        payload: {
            blog
        }
    }
}


