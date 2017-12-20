/**
 * Created by Yaroslav on 25.08.2017.
 */
import {
    TOGGLE_MENU,
    TOGGLE_TAB,
    FAST_PARKING,
    TOGGLE_BAR
} from '../constants/UI'

const initialState = {
    menuOpen: false,
    barOpen: true,
    activeTab: FAST_PARKING,
};

export default function ui(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_MENU:
            return { ...state, menuOpen: action.payload };
        case TOGGLE_TAB:
            return { ...state, activeTab: action.payload };
        case TOGGLE_BAR:
            return { ...state, barOpen: action.payload };
        default:
            return state;
    }
}
