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
                <View style={styles.title}>
                    <Text style={styles.titleTxt}>
                        Settings
                    </Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.selectWrap}>
                        <View style={styles.label}>
                            <Text style={styles.labelText}>
                                Language
                            </Text>
                            <View >
                                <Text>
                                    En
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
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
        backgroundColor: '#F3F6F8',
    },
    title: {
        height: 56,
        borderBottomWidth: 1,
        borderBottomColor: '#D3DFE1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleTxt: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#5093DF'
    },
    content: {
        paddingTop: 12,
        paddingLeft: 8,
        paddingRight: 8
    },
    label: {
        backgroundColor: '#FFFFFF'
    },
    labelText: {
        color: '#6F7071',
        fontSize: 16,
        fontWeight: 'bold'
    }
});