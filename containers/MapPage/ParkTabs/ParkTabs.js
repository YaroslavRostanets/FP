/**
 * Created by Yaroslav on 08.09.2017.
 */

import React, { Component } from 'react';
import { View, FlatList, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class ParkTabs extends Component {

    render() {
        const parkExample = [{
            key: 1,
            lat: 52,
            lon: 53,
            onWeekdays: '8-22',
            onSaturday: '12-15',
            onSunday: '15-19',
            time: '2h'
        },
        {
            key: 3,
            lat: 53,
            lon: 54,
            onWeekdays: '8-22',
            onSaturday: '12-15',
            onSunday: '15-19',
            time: '2h'
            }

        ];

        const menuOpen = this.props.menuOpen;

        return (
            <View style={styles.parkTabs}>
                <View style={styles.botCont}>
                    <View style={styles.tabCont}>
                        <FlatList style={{height: 100}}
                            data={parkExample}
                            renderItem={({item}) => (
                                <View style={{height: 100}}>
                                    <Text>{item.key}</Text>
                                </View>
                            )}
                        />
                        <View style={styles.tabSel}>
                            <TouchableHighlight style={styles.oneTabBut}>
                                <Text>Fast</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.oneTabBut}>
                                <Text>
                                    S
                                </Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.oneTabBut}>
                                <Text>
                                    La
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </View>
        );

    }
}

const styles = {
    parkTabs: {
        position: "absolute",
        bottom: 15,
        width: "100%",
        paddingRight: "3.5%",
        paddingLeft: "3.5%",
        zIndex: 9,
        display: "flex",

    },
    botCont: {
        backgroundColor: 'rgba(243, 246, 248, 0.7)',
        paddingTop: 15,
        paddingRight: 4,
        paddingBottom: 7,
        paddingLeft: 4,
        width: '100%'
    },
    tabCont: {
        maxHeight: 400
    },
    parkList: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#EDEDED',
        position: 'relative'
    },
    tabSel: {
        display: "flex",
        justifyContent: 'space-between',
        flexDirection: "row"
    },
    oneTabBut: {
        backgroundColor: '#FFFFFF',
        width: '32%',
        height: 105,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#EDEDED',
        position: 'relative'
    }

};


export default ParkTabs

