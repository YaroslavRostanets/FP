/**
 * Created by Yaroslav on 11.02.2018.
 */
import {
    SET_NEW_LOCATION,
    GET_CURRENT_POSITION_REQUEST,
    GET_CURRENT_POSITION_SUCCESS
} from '../constants/Location';

export function setNewLocation(locationObject) {

    return {
        type: SET_NEW_LOCATION,
        payload: locationObject
    }

}

export function getCurrentPosition() {

    return (dispatch)=>{
        dispatch({
            type: GET_CURRENT_POSITION_REQUEST,
        });

        navigator.geolocation.getCurrentPosition(success, error, options);

        let options = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 60000
        };

        function success(position) {
            dispatch({
                type: GET_CURRENT_POSITION_SUCCESS,
                payload: position.coords
            });
        }

        function error(err) {
            console.log('_ERROR_: LOCATION_ACTIONS', err);
        }




    }
}

