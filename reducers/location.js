import {
    SET_NEW_LOCATION,
    LAT,
    LON
} from '../constants/Location';

const initialState = {
    lat: LAT,
    lon: LON
};

export default function location(state = initialState, action) {
    console.log('action: ', action);
    switch (action.type) {
        case SET_NEW_LOCATION:
            return { ...state, lat: action.payload.lat, lon: action.payload.lon };
        default:
            return state;
    }
}
