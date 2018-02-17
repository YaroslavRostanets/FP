/**
 * Created by Yaroslav on 13.02.2018.
 */
import {
    FAST_PLACES_RESULT,
    GET_FAST_PLACES
} from '../constants/Places';

const initialState = {
    fastParkingPlaces: []
};

export default function places(state = initialState, action) {
    console.log("action.payload___________________________: ", action.payload);
    switch (action.type) {
        //case GET_FASTPLACES_REQUEST:
        case FAST_PLACES_RESULT:
            return { ...state , fastParkingPlaces: action.payload };
        default:
            return state;
    }
}

