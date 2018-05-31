/**
 * Created by Yaroslav on 13.02.2018.
 */
import {
    GET_FASTPLACES_REQUEST,
    FAST_PLACES_RESULT,
    GET_PLACE_BY_ID,
    GET_PLACE_BY_ID_SUCCESS,
    GET_PLACES_BY_FILTER,
    GET_PLACES_BY_FILTER_SUCCESS,
    FAST_PLACES_ON_MAP,
    SEARCH_FILTER_EDIT,
    SEARCH_PLACES_REQUEST,
    SEARCH_PLACES_SUCCES,
    GET_DIRECTION_REQUEST,
    GET_DIRECTION_ERROR,
    GET_DIRECTION_SUCCESS,
    HIDE_LOADER
} from '../constants/Places';

const initialState = {
    fastParkingPlaces: [],
    fastPlacesLoader: false,
    markersOnMap: [],
    placeDetail: {},
    searchResult: [],
    searchFilter: {
        MONFRY: false,
        SAT: false,
        SUN: true,
        filterFrom: "14-00",
        filterTo: "16-00",
        filterTimeFrom: "30min",
        sliderValues: [1],
        sliderDistanceValue: [3],
        distance: 8,
        loader: false
    },
    showLoader: false,
    route: {
        markerId: '',
        distance: '',
        duration: '',
        origin: {
            latitude: 50.31209812145984,
            longitude: 30.53152084350586
        },
        destination: {
            latitude: 50.47868822762936,
            longitude: 30.46087885291331
        }
    }
};

export default function places(state = initialState, action) {
    console.log('__PLACES__');
    switch (action.type) {
        case GET_FASTPLACES_REQUEST:
            return { ...state, fastPlacesLoader: true};
        case FAST_PLACES_RESULT:
            return { ...state , fastParkingPlaces: action.payload, markersOnMap: action.payload, fastPlacesLoader: false };
        case GET_PLACE_BY_ID:
            return { ...state, showLoader: true };
        case GET_PLACE_BY_ID_SUCCESS:
            return { ...state, showLoader: false, placeDetail: action.payload };
        case GET_PLACES_BY_FILTER:
            return { ...state, showLoader: true };
        case GET_PLACES_BY_FILTER_SUCCESS:
            return { ...state, showLoader: false, markersOnMap: action.payload };
        case FAST_PLACES_ON_MAP:
            return { ...state, markersOnMap: state.fastParkingPlaces};
        case SEARCH_FILTER_EDIT:
            return { ...state, searchFilter: action.payload };
        case SEARCH_PLACES_REQUEST:
            return { ...state,  searchFilter: {...state.searchFilter, loader: true} };
        case SEARCH_PLACES_SUCCES:
            return { ...state,  searchResult: action.payload,
                markersOnMap: action.payload,
                searchFilter: {...state.searchFilter, loader: false}
            };
        case GET_DIRECTION_REQUEST:
            return { ...state, showLoader: true };
        case GET_DIRECTION_SUCCESS:
            return { ...state, route: action.payload, markersOnMap: [action.payload.marker] };
        case GET_DIRECTION_ERROR:
            return { ...state, error: action.payload };
        case HIDE_LOADER:
            return { ...state, showLoader: false };
        default:
            return state;
    }
}

