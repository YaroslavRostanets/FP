/**
 * Created by Yaroslav on 26.08.2017.
 */
import {
    TOGGLE_MENU,
    TOGGLE_BAR,
    TOGGLE_TAB,
    GET_PLACE_BY_ID,
    GET_PLACE_BY_ID_SUCCESS
} from '../constants/UI';

import { API } from '../constants/appConfig';

export function toggleMenu(menuState) {

    return {
        type: TOGGLE_MENU,
        payload: menuState
    }

}

export function toggleBar(barState) {

    return {
        type: TOGGLE_BAR,
        payload: barState
    }
}

export function toggleTab(activeTab) {
    console.log('toggle_tab');
    return {
        type: TOGGLE_TAB,
        payload: activeTab
    }
}

export function getPlaceById(id, navigator) {

    let myRequest = new Request(`${API}getplace?id=${id}`);

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
                },5000);
            }).catch(error => {
            console.error('__ERROR__: ', error);
        });


    };

}