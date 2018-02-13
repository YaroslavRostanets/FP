/**
 * Created by Yaroslav on 13.02.2018.
 */

import {
    GET_PLACES_REQUEST,
    GET_PLACES_SUCCESS
} from '../constants/Places'
import { API } from '../constants/appConfig';

export function getPlaces() {

    // return {
    //     type: GET_PLACES_SUCCESS,
    //     payload: [{'id':1},{'id':2},{'id':3}]
    // }http://1117158.kiray92.web.hosting-test.net/api/fastlist?lat=60.14902464279283&lon=24.913558959960938&day_index=2
    return (dispatch) => {
        dispatch({
            type: GET_PLACES_REQUEST
        });

        const myRequest = new Request(`${API}fastlist?lat=60.14902464279283&lon=24.913558959960938&day_index=2`);

        fetch(myRequest)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong on api server!');
                }
            })
            .then(response => {
                console.debug(response);
                // ...
            }).catch(error => {
            console.error(error);
        });
        // setTimeout(() => {
        //     dispatch({
        //         type: GET_PLACES_SUCCESS,
        //         payload: [{'id':1},{'id':2},{'id':3},{'id':4},{'id':5}]
        //     })
        // }, 10000)

    }
}

