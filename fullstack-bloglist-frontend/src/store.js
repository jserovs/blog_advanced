import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import messageReducer from './reducers/messageReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogsReducer from './reducers/blogsReducer'



const store = createStore(
    combineReducers(
        {notifications: messageReducer, blogs: blogsReducer}
    ), composeWithDevTools(applyMiddleware(thunk)
    )
)

export default store
