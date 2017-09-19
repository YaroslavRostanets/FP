/**
 * Created by Yaroslav on 08.09.2017.
 */

import React, { Component } from 'react';
import { View, FlatList, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TabSelector from '../../../containers/MapPage/ParkTabs/TabSelector'
import  FastParking from '../../../containers/MapPage/ParkTabs/FastParking'

class ParkTabs extends Component {

    render() {

        const menuOpen = this.props.menuOpen;

        return (
            <View style={styles.parkTabs}>
                <View style={styles.botCont}>
                    <View style={styles.tabCont}>
                        <FastParking />
                    </View>
                    <TabSelector />
                    <TouchableHighlight style={styles.centerBut}>
                        <Text style={styles.centerButText}>
                            Start(78)
                        </Text>
                    </TouchableHighlight>
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
        borderStyle: 'solid',
        borderColor: '#EDEDED',
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 3
    },
    parkList: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#EDEDED',
        position: 'relative'
    },
    centerBut: {
        height: 48,
        marginTop: 7,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 0,
        backgroundColor: '#FF6D64',
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1
    },
    centerButText: {
        fontSize: 16,
        color: '#FFFFFF'
    }

};


export default ParkTabs

