/**
 * Created by Yaroslav on 11.02.2018.
 */
import {
    SET_NEW_LOCATION
} from '../constants/Location';

export function setNewLocation(locationObject) {

    return {
        type: SET_NEW_LOCATION,
        payload: locationObject
    }

}

