/**
 * Created by Yaroslav on 13.02.2018.
 */
import {
    GET_FASTPLACES_REQUEST,
    FAST_PLACES_RESULT,
    GET_PLACE_BY_ID,
    GET_PLACE_BY_ID_SUCCESS
} from '../constants/Places'
import { API } from '../constants/appConfig';

export function getPlaces(findOptionsObj) {

    const lat = findOptionsObj.lat;
    const lon = findOptionsObj.lon;
    const dayIndex = findOptionsObj.dayIndex;
    const myRequest = new Request(`${API}fastlist?lat=${lat}&lon=${lon}&day_index=${dayIndex}`);

    return (dispatch) => {
        dispatch({
            type: GET_FASTPLACES_REQUEST
        });

        fetch(myRequest)
            .then(response => {
                console.log('__response_status__', response.status);
                if (response.status === 200) {
                    console.log('__type of__', typeof response);
                    return response.json();
                } else {
                    throw new Error('Something went wrong on api server!');
                }
            })
            .then(response => {
                console.log('__TEST___:', response);
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