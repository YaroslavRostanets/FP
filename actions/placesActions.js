/**
 * Created by Yaroslav on 13.02.2018.
 */
import {
    GET_FASTPLACES_REQUEST,
    FAST_PLACES_RESULT
} from '../constants/Places'
import { API } from '../constants/appConfig';

export function getPlaces(findOptionsObj) {
    //console.log('findObj_________________________________________________-: ',findOptionsObj);
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
            console.error('placesActions: ', error);
        });

    };

}

