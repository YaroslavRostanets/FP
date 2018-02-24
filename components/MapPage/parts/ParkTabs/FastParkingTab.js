/**
 * Created by Yaroslav on 19.09.2017.
 */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as placesActions from '../../../../actions/placesActions';
import { connect } from 'react-redux';
import { View, Text, FlatList } from 'react-native';
//import { createIconSetFromFontello } from 'react-native-vector-icons';
//import fontelloConfig from '../../../src/config.json';
import Icon from 'react-native-vector-icons/FontAwesome';

//const CustIcon = createIconSetFromFontello(fontelloConfig);

class FastParking extends Component {

    _keyExtractor = (item, index) => item.id;

    timeWithoutMin(time) {
        return time.split(':')[0]; //Возвращаем только часы
    }

    timeIntervalConvert(interval) {
        if(interval >= 60) return interval / 60 + "h";
        else return interval + "m"
    }

    distanceConvert(distance) {
        const dist = Number(distance);

        if( distance <= 1 ){
            return dist * 1000 + ' m';
        } else {
            return dist + ' km';
        }
    }

    render(){
        const fastPlaces = this.props.places;
        const h = this.timeWithoutMin;
        const i = this.timeIntervalConvert;
        const d = this.distanceConvert;

        const parkExample = [{
            key: 1,
            lat: 52,
            lon: 53,
            onWeekdays: '8-22',
            onSaturday: '12-15',
            onSunday: '15-19',
            time: '2h'
        }];

        return (
            <FlatList style={styles.fastParking}
                keyExtractor={this._keyExtractor}
                data={fastPlaces}
                renderItem={({item}) => (
                    <View id={item.id} style={styles.oneRow}>
                        <View style={styles.imgCont}>
                            <Icon style={styles.timer} name="circle-thin"/>
                            <Text style={styles.icoTime}>{i( item['time_interval'] )}</Text>
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.distance}>
                                {d(item.geodist_pt)}
                            </Text>
                            <View style={styles.time}>
                                <Text style={styles.onDays}>{h(item['weekday_from'])}-{h(item['weekday_to'])}</Text>
                                <Text style={styles.onDays}>({h(item['saturday_from'])}-{h(item['saturday_to'])})</Text>
                                <Text style={styles.onSunday}>{h(item['sunday_from'])}-{h(item['sunday_to'])}</Text>
                            </View>
                        </View>
                    </View>
                )}
            />
        )
    }
}

const styles = {
    fastParking: {
        paddingLeft: 12,
        paddingRight: 12,
        height: 250
    },
    oneRow: {
        display: 'flex',
        flexDirection: 'row',
        height: 62.5,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA'
    },
    imgCont: {
        width: 60,
        height: '100%'
    },
    icoTime: {
        color: '#5093DF',
        position: 'absolute',
        left: 13,
        top: 13,
        fontSize: 15
    },
    content: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    timer: {
        fontSize: 50
    },
    time: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    onDays: {
        color: '#6F7071',
        fontSize: 16,
        paddingRight: 7,
        marginRight: 7,
        borderRightColor: '#B6B6B6',
        borderRightWidth: 1,
    },
    onSunday: {
        fontSize: 16,
        color: '#FB0007'
    }
};

function mapStateToProps (store) {

    return {
        location: store.location,
        places: store.places.fastParkingPlaces
    }
}

function mapDispatchToProps(dispatch) {
    return {
        placesActions: bindActionCreators(placesActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FastParking)

