/**
 * Created by Yaroslav on 26.08.2017.
 */
import {
    TOGGLE_MENU,
    TOGGLE_BAR,
    TOGGLE_TAB
} from '../constants/UI'

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