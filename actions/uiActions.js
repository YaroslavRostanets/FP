/**
 * Created by Yaroslav on 26.08.2017.
 */
import { TOGGLE_MENU } from '../constants/UI'

export function toggleMenu(menuState) {

    return {
        type: TOGGLE_MENU,
        payload: menuState
    }

}
