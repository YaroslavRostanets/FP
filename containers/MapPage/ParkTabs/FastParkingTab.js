/**
 * Created by Yaroslav on 19.09.2017.
 */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as placesActions from '../../../actions/placesActions';
import { connect } from 'react-redux';
import { View, Text, FlatList } from 'react-native';
//import { createIconSetFromFontello } from 'react-native-vector-icons';
//import fontelloConfig from '../../../src/config.json';
import Icon from 'react-native-vector-icons/FontAwesome';

//const CustIcon = createIconSetFromFontello(fontelloConfig);

class FastParking extends Component {

    render(){

        const parkExample = [{
            key: 1,
            lat: 52,
            lon: 53,
            onWeekdays: '8-22',
            onSaturday: '12-15',
            onSunday: '15-19',
            time: '2h'
        }, {
                key: 3,
                lat: 53,
                lon: 54,
                onWeekdays: '8-22',
                onSaturday: '12-15',
                onSunday: '15-19',
                time: '2h'
            },
            {
                key: 4,
                lat: 53,
                lon: 54,
                onWeekdays: '8-22',
                onSaturday: '12-15',
                onSunday: '15-19',
                time: '2h'
            },
            {
                key: 5,
                lat: 53,
                lon: 54,
                onWeekdays: '8-22',
                onSaturday: '10-15',
                onSunday: '15-17',
                time: '2h'
            },
            {
                key: 6,
                lat: 53,
                lon: 54,
                onWeekdays: '7-15',
                onSaturday: '12-15',
                onSunday: '15-19',
                time: '2h'
            }

        ];

        return (
            <FlatList style={styles.fastParking}
                data={parkExample}
                renderItem={({item}) => (
                    <View id={item.key} style={styles.oneRow}>
                        <View style={styles.imgCont}>
                            <Icon style={styles.timer} name="circle-thin"/>
                            <Text style={styles.icoTime}>2h</Text>
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.distance}>
                                200m
                            </Text>
                            <View style={styles.time}>
                                <Text style={styles.onDays}>{item.onWeekdays}</Text>
                                <Text style={styles.onDays}>({item.onSaturday})</Text>
                                <Text style={styles.onSunday}>{item.onSunday}</Text>
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
        places: store.places
    }
}

function mapDispatchToProps(dispatch) {
    return {
        placesActions: bindActionCreators(placesActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FastParking)

