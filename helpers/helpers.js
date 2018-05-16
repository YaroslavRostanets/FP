/**
 * Created by Yaroslav on 27.04.2018.
 */

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

