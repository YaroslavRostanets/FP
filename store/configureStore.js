/**
 * Created by Yaroslav on 25.08.2017.
 */
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/index'

function configureStore(initialState) {
    const store = createStore(rootReducer, initialState);
    return store;
}

const store = configureStore();

export default store;