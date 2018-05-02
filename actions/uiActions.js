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

