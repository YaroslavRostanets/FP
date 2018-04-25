import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, Button, Dimensions } from 'react-native';
import Interactable from 'react-native-interactable';

const Screen = Dimensions.get('window');
const SideMenuWidth = 280;
const RemainingWidth = Screen.width - SideMenuWidth;

export default class Options extends Component {
    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }
    onMenuPress() {
        this.refs['menuInstance'].setVelocity({x: 2000});
    }
    onClosePress() {
        this.refs['menuInstance'].setVelocity({x: -2000});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: 'white',
    },

});