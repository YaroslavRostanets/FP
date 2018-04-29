/**
 * Created by Yaroslav on 29.04.2018.
 */

import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { Bubbles } from 'react-native-loader';

const Screen = Dimensions.get('window');


export default class Loader extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.center}>
                    <Bubbles style={styles.center} size={16} color="#FF6D64" />
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: 'rgba(255,255,255,0.85)',
        position: 'absolute',
        zIndex: 1099,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    center: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 140,
        marginLeft: -70,
        marginTop: -20
    },
    loadText: {
        fontSize: 16,
        color: '#FF6D64'
    }
});
