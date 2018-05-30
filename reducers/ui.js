/**
 * Created by Yaroslav on 25.08.2017.
 */
import {
    TOGGLE_MENU,
    TOGGLE_TAB,
    FAST_PARKING,
    SEARCH,
    TOGGLE_BAR,
    TOGGLE_LANGUAGE
} from '../constants/UI';

import {lang} from '../constants/appConfig'

import {Platform, NativeModules} from 'react-native';

const initialState = {
    menuOpen: false,
    barOpen: true,
    activeTab: FAST_PARKING,
    localization: getLanguageCode()
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

function getLanguageCode() {
    let systemLanguage = 'en';
    let defaultLang = 'en';

    if (Platform.OS === 'android') {
        systemLanguage = NativeModules.I18nManager.localeIdentifier;
    } else {
        systemLanguage = NativeModules.SettingsManager.settings.AppleLocale;
    }
    const languageCode = systemLanguage.substring(0, 2);

    if(~lang.indexOf(languageCode)) return  defaultLang; //Если в программе нету такого языка то английский

    return languageCode;
}
