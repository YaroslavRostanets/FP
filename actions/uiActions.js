/**
 * Created by Yaroslav on 26.08.2017.
 */
import {
    TOGGLE_MENU,
    TOGGLE_BAR,
    TOGGLE_TAB,
    TOGGLE_LANGUAGE,
    TOGGLE_CALLOUT
} from '../constants/UI';

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
    return {
        type: TOGGLE_TAB,
        payload: activeTab
    }
}

export function toggleLanguage(language) {
    return (dispatch) => {

        dispatch({
            type: TOGGLE_LANGUAGE,
            payload: language
        });
    }
}

export function toggleCallOut(calloutState) {
    return {
        type: TOGGLE_CALLOUT,
        payload: calloutState
    }
}