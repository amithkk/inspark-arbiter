import authReducer from './authReducer'
import marksReducer from './marksReducer'
import {combineReducers} from 'redux'
import {firebaseReducer} from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    marks: marksReducer,
    firebase: firebaseReducer
})

export default rootReducer