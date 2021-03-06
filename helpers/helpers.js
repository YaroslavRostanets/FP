/**
 * Created by Yaroslav on 27.04.2018.
 */
import {Platform, NativeModules} from 'react-native';

export function timeIntervalConvert(interval) {
    return (interval >= 60) ? interval / 60 + ' h' : interval + ' min';
}

export function timeWithoutMin(time) {
    time = String(time);
    return time.split(':')[0]; //Возвращаем только часы
}

export function distanceConvert(distance) {
    const dist = Number(distance);

    if( distance <= 1 ){
        return dist * 1000 + ' m';
    } else {
        return dist + ' km';
    }
}

export function translator(langJSON, str, lang){  //Принимает обьект с переводами, строку для перевода, код языка
    if( !lang ) {
        lang = 'en';
    }
    return langJSON[lang][str];
    //let objResult = JSON.parse(langJSON);
    //return (objResult[lang][str]);
}

export function objToStrGetParams(obj) {
     return Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&');
}

export function getLanguageCode() {
    let systemLanguage = 'en';
    let defaultLang = 'en';

    if (Platform.OS === 'android') {
        systemLanguage = NativeModules.I18nManager.localeIdentifier;
    } else {
        systemLanguage = NativeModules.SettingsManager.settings.AppleLocale;
    }
    let languageCode = systemLanguage.substring(0, 2);

    return languageCode;
}