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
    SEARCH_PLACES_SUCCES
} from '../constants/Places'
import { SEARCH_RESULT } from '../constants/UI'
import { API } from '../constants/appConfig';
import { objToStrGetParams } from '../helpers/helpers';

export function getPlaces(findOptionsObj) {

    const lat = findOptionsObj.lat;
    const lon = findOptionsObj.lon;
    const myRequest = new Request(`${API}fastlist?lat=${lat}&lon=${lon}`);

    return (dispatch) => {
        dispatch({
            type: GET_FASTPLACES_REQUEST
        });

        fetch(myRequest)
            .then(response => {
                console.log('__response_status__', response.status);
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong on api server!');
                }
            })
            .then(response => {
                dispatch({
                    type: FAST_PLACES_RESULT,
                    payload: response
                        });
                findOptionsObj.navigator.push({
                    title: 'MapPage',
                    animationType: 'FloatFromBottomAndroid'
                });
            }).catch(error => {
            console.log('__ERROR___: ', error);
        });

    };
}

export function refreshFastPlaces(findOptionsObj) {

    const lat = findOptionsObj.lat;
    const lon = findOptionsObj.lon;
    const myRequest = new Request(`${API}fastlist?lat=${lat}&lon=${lon}`);

    return (dispatch) => {
        dispatch({
            type: GET_FASTPLACES_REQUEST
        });

        fetch(myRequest)
            .then(response => {

                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong on api server!');
                }
            })
            .then(response => {
                dispatch({
                    type: FAST_PLACES_RESULT,
                    payload: response
                });

            }).catch(error => {
            console.log('__ERROR___: ', error);
        });

    };
}

export function getPlaceById(id, navigator, lat, lon) {

    let myRequest = new Request(`${API}getplace?id=${id}&lat=${lat}&lon=${lon}`);

    return (dispatch) => {
        dispatch({
            type: GET_PLACE_BY_ID
        });

        fetch(myRequest)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong on api server!');
                }
            })
            .then(response => {
                setTimeout(function(){
                    navigator.push({
                        title: 'ParkDetail',
                        animationType: 'FloatFromBottomAndroid'
                    });

                    dispatch({
                        type: GET_PLACE_BY_ID_SUCCESS,
                        payload: response
                    });
                },1000);
            }).catch(error => {
            console.error('__ERROR__: ', error);
        });


    };

}

export function getPlacesByFilter(filterObject, lat, lon, botBarHide){
    let myRequest = new Request(`${API}getplacebyfilter?&lat=${lat}&lon=${lon}&` + objToStrGetParams(filterObject));

    console.log('filterURL:__', `${API}getplacebyfilter?&lat=${lat}&lon=${lon}&` + objToStrGetParams(filterObject) );

    return (dispatch) => {
        dispatch({
            type: GET_PLACES_BY_FILTER
        });

        fetch(myRequest)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong on api server!');
                }
            })
            .then(response => {
                setTimeout(function(){

                    dispatch({
                        type: GET_PLACES_BY_FILTER_SUCCESS,
                        payload: response
                    });
                    botBarHide();
                },1000);
            }).catch(error => {
            console.error('__ERROR__: ', error);
        });

    };
}

export function showFastPlacesOnMap(fastParkingPlaces){
    return {
        type: FAST_PLACES_ON_MAP,
        payload: fastParkingPlaces
    }
}

export function editSearchOptions(searchOptionsObject){
    return {
        type: SEARCH_FILTER_EDIT,
        payload: searchOptionsObject
    }
}

export function getPlacesSearch(searchObject, lat, lon, toggleTab){
    let myRequest = new Request(`${API}getplacessearch?&lat=${lat}&lon=${lon}&` + objToStrGetParams(searchObject));

    console.log('_TEST_URL_:', `${API}getplacessearch?&lat=${lat}&lon=${lon}&` + objToStrGetParams(searchObject));

    return (dispatch) => {
        dispatch({
            type: SEARCH_PLACES_REQUEST,
        });

        fetch(myRequest)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong on api server!');
                }
            })
            .then(response => {
                setTimeout(function(){
                    dispatch({
                        type: SEARCH_PLACES_SUCCES,
                        payload: response
                    });
                    toggleTab(SEARCH_RESULT);
                },1000);
            }).catch(error => {
            console.error('__ERROR__: ', error);
        });
    };

}