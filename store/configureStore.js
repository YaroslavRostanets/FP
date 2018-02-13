/**
 * Created by Yaroslav on 25.08.2017.
 */
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

function configureStore(initialState) {
    const logger = createLogger();
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk, logger));

    return store;
}

const store = configureStore();

export default store;