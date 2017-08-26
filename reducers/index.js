/**
 * Created by Yaroslav on 25.08.2017.
 */
import { combineReducers } from 'redux'
import ui from './ui'
import user from './user'

const initialState = {
    user: 'Unknown User',
};

export default combineReducers({
    ui,
    user
})

