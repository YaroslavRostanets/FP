/**
 * Created by Yaroslav on 13.02.2018.
 */
import {
    FAST_PLACES_RESULT,
    GET_PLACE_BY_ID,
    GET_PLACE_BY_ID_SUCCESS,
    GET_PLACES_BY_FILTER,
    GET_PLACES_BY_FILTER_SUCCESS
} from '../constants/Places';

const initialState = {
    fastParkingPlaces: [],
    markersOnMap: [],
    placeDetail: {},
    showLoader: false
};

export default function places(state = initialState, action) {

    switch (action.type) {
        //case GET_FASTPLACES_REQUEST:
        case FAST_PLACES_RESULT:
            return { ...state , fastParkingPlaces: action.payload, markersOnMap: action.payload };
        case GET_PLACE_BY_ID:
            return { ...state, showLoader: true };
        case GET_PLACE_BY_ID_SUCCESS:
            return { ...state, showLoader: false, placeDetail: action.payload };
        case GET_PLACES_BY_FILTER:
            return { ...state, showLoader: true };
        case GET_PLACES_BY_FILTER_SUCCESS:
            return { ...state, showLoader: false, markersOnMap: action.payload };
        default:
            return state;
    }
}

