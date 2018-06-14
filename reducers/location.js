import {
    SET_NEW_LOCATION,
    LAT,
    LON,
    GET_CURRENT_POSITION_REQUEST,
    GET_CURRENT_POSITION_SUCCESS
} from '../constants/Location';

const initialState = {
    lat: LAT,
    lon: LON,
    fetching: false
};

export default function location(state = initialState, action) {

    switch (action.type) {
        case SET_NEW_LOCATION:
            return { ...state, lat: action.payload.lat, lon: action.payload.lon };
        case GET_CURRENT_POSITION_REQUEST:
            return { ...state, fetching: true };
        case GET_CURRENT_POSITION_SUCCESS:
            return { ...state, fetching: false, lat: action.payload.latitude, lon: action.payload.longitude};
        default:
            return state;
    }
}


