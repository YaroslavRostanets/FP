import {
    SET_NEW_LOCATION
} from '../constants/Location'

const initialState = {
    lat: 60.16817554863811,
    lon: 24.94085311889611
};

export default function location(state = initialState, action) {
    switch (action.type) {
        case SET_NEW_LOCATION:
            return { ...state, lat: action.payload.lat, lon: action.payload.lon };
        default:
            return state;
    }
}
