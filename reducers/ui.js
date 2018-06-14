/**
 * Created by Yaroslav on 25.08.2017.
 */
import {
    TOGGLE_MENU,
    TOGGLE_TAB,
    FAST_PARKING,
    SEARCH,
    TOGGLE_BAR,
    TOGGLE_LANGUAGE,
    TOGGLE_CALLOUT
} from '../constants/UI';

const initialState = {
    menuOpen: false,
    barOpen: true,
    activeTab: FAST_PARKING,
    callout: false,
    localization: 'en'
};

export default function ui(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_MENU:
            return { ...state, menuOpen: action.payload };
        case TOGGLE_TAB:
            return { ...state, activeTab: action.payload };
        case TOGGLE_BAR:
            return { ...state, barOpen: action.payload };
        case TOGGLE_LANGUAGE:
            return { ...state, localization: action.payload };
        default:
            return state;
    }
}


