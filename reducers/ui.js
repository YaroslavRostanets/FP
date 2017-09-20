/**
 * Created by Yaroslav on 25.08.2017.
 */
import {TOGGLE_MENU} from '../constants/UI'

const initialState = {
    menuOpen: false,
    activeTab: 'FastParking'
};

export default function ui(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_MENU:
            return { ...state, menuOpen: action.payload };

        default:
            return state;
    }
}
