/**
 * Created by Yaroslav on 13.02.2018.
 */
import {
    FAST_PLACES_RESULT,
    GET_PLACE_BY_ID,
    GET_PLACE_BY_ID_SUCCESS,
    GET_PLACES_BY_FILTER,
    GET_PLACES_BY_FILTER_SUCCESS,
    FAST_PLACES_ON_MAP,
    SEARCH_FILTER_EDIT,
    SEARCH_PLACES_REQUEST,
    SEARCH_PLACES_SUCCES
} from '../constants/Places';

const initialState = {
    fastParkingPlaces: [],
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
        case FAST_PLACES_ON_MAP:
            return { ...state, markersOnMap: state.fastParkingPlaces};
        case SEARCH_FILTER_EDIT:
            return { ...state, searchFilter: action.payload };
        case SEARCH_PLACES_REQUEST: {
            return { ...state,  searchFilter: {...state.searchFilter, loader: true} }
        }
        case SEARCH_PLACES_SUCCES: {
            return { ...state,  searchResult: action.payload,
                markersOnMap: action.payload,
                searchFilter: {...state.searchFilter, loader: false}
            }
        }
        default:
            return state;
    }
}

