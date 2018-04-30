/**
 * Created by Yaroslav on 29.04.2018.
 */

import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text, Animated } from 'react-native';
import { Bubbles } from 'react-native-loader';

const Screen = Dimensions.get('window');

export default class Loader extends Component {

    state = {
        fadeAnim: new Animated.Value(0),
    };

    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 1,
                duration: 300,
            }
        ).start();
    }

    render() {

        let { fadeAnim } = this.state;

        return (
            <Animated.View style={{...styles.container,opacity: fadeAnim}}>
                <View style={styles.center}>
                    <Bubbles style={styles.center} size={16} color="#FF6D64" />
                </View>
            </Animated.View>
        );
    }

}

const styles = {
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
};
