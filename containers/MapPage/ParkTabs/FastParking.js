/**
 * Created by Yaroslav on 19.09.2017.
 */

import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';

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
                onSaturday: '12-15',
                onSunday: '15-19',
                time: '2h'
            },
            {
                key: 6,
                lat: 53,
                lon: 54,
                onWeekdays: '8-22',
                onSaturday: '12-15',
                onSunday: '15-19',
                time: '2h'
            }

        ];

        return (
            <FlatList style={styles.fastParking}
                data={parkExample}
                renderItem={({item}) => (
                    <View style={styles.oneRow}>
                        <View style={styles.imgCont}>
                            <Text style={styles.icoTime}>2h</Text>
                        </View>
                        <View style={styles.content}>

                        </View>
                        <Text>{item.key}</Text>
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
        left: 19,
        top: 17,
        fontSize: 15
    },
    content: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
};

export default FastParking
