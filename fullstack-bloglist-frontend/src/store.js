import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import messageReducer from './reducers/messageReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'



const store = createStore(
    combineReducers(
        {notifications: messageReducer, blogs: blogsReducer, user: userReducer}
    ), composeWithDevTools(applyMiddleware(thunk)
    )
)

export default store
