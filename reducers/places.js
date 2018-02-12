/**
 * Created by Yaroslav on 13.02.2018.
 */
import {
    GET_PLACES_REQUEST,
    GET_PLACES_SUCCESS
} from '../constants/Places';

const initialState = {

};

export default function places(state = initialState, action) {

    switch (action.type) {
        case GET_PLACES_SUCCESS:
            return { ...state, places: action.payload };
        default:
            return state;
    }
}

