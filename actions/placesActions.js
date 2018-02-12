/**
 * Created by Yaroslav on 13.02.2018.
 */
/**
 * Created by Yaroslav on 26.08.2017.
 */
import {
    GET_PLACES_REQUEST,
    GET_PLACES_SUCCESS
} from '../constants/Places'

export function getPlaces() {

    return (dispatch) => {
        dispatch({
            type: GET_PHOTOS_REQUEST,
            payload: {}
        });

        setTimeout(() => {
            dispatch({
                type: GET_PHOTOS_SUCCESS,
                payload: [1,2,3,4,5]
            })
        }, 4000)
    }
}

