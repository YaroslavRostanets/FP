/**
 * Created by Yaroslav on 25.08.2017.
 */
import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ParkDetail extends Component {

    render() {
        return (
            <View style={styles.screen}>
                <View style={styles.topBtns}>
                    <View style={styles.col}>
                        <Image style={styles.sign}
                               source={require('../../images/thumb1.png' )}
                        />
                    </View>
                    <View style={styles.col}>
                        <Icon name="circle-thin" style={styles.ico} />
                        <Text style={styles.interval}>
                            2h
                        </Text>
                    </View>
                    <View style={styles.col}>
                        <Icon name="circle-thin" style={styles.ico} />
                        <Text style={styles.time}>
                            8-17
                        </Text>
                    </View>
                    <View style={styles.col}>
                        <TouchableHighlight style={styles.back}>
                            <Icon name="reply" style={styles.btnIco} />
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.parkInfo}>
                    <View style={styles.col2}>
                        <View style={styles.imgCont}>
                            <Image style={styles.imgPlace} resizeMode={'contain'}
                                   source={require('../../images/p.jpg' )}
                            />
                        </View>
                    </View>
                    <View style={styles.col2}>
                        <View style={{...styles.row,...styles.border}}>
                            <Text style={styles.label}>Time limit:</Text>
                            <Text style={styles.cont}>2h</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Mon-Fri:</Text>
                            <Text style={styles.cont}>8-18</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Sat:</Text>
                            <Text style={styles.cont}>(8-18)</Text>
                        </View>
                        <View style={{...styles.row,...styles.border}}>
                            <Text style={styles.label}>Sun:</Text>
                            <Text style={styles.cont}>(-)</Text>
                        </View>
                        <View style={{...styles.row, paddingTop: 10}}>
                            <Text style={styles.label}>Zone:</Text>
                            <Text style={styles.zone}>out of zone</Text>
                        </View>
                    </View>
                </View>
                <Text>
                    It's a park detail page
                </Text>
            </View>
        );
    }
}

const styles = {
    screen: {
        padding: 10
    },
    time: {
        fontSize: 20,
        color: '#5093DF',
        position: 'absolute'
    },
    interval: {
        fontSize: 28,
        color: '#5093DF',
        position: 'absolute',
        left: 0,
        top: '50%',
        width: '100%',
        textAlign: 'center',
        transform: [
            { translateY: -20}
        ],
    },
    topBtns: {
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderColor: '#D8D8D8',
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    col: {
        width: '25%',
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    sign: {
        width: 70,
        height: 70,
        borderWidth: 1,
        borderColor: '#818283',
        borderRadius: 4
    },
    ico: {
        fontSize: 65
    },
    btnIco: {
        fontSize: 20
    },
    back: {
        height: 50,
        width: 50,
        borderRadius: 3,
        backgroundColor: '#F2F5F7',
        borderWidth: 1,
        borderColor: '#D3DFE1',
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    parkInfo: {
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderColor: '#D3DFE1',
        display: 'flex',
        flexDirection: 'row'
    },
    col2: {
        width: '45%',
        flexGrow: 1
    },
    label: {
        fontSize: 16,
        color: '#6F7071',
        width: '45%',
        textAlign: 'right'
    },
    cont: {
        fontSize: 24,
        color: '#6F7071',
        textAlign: 'center',
        width: '55%',
        position: 'relative',
        top: 4
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    border: {
        paddingBottom: 10,
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1
    },
    zone: {
        fontWeight: 'bold',
        fontSize: 14,
        width: '50%',
        textAlign: 'center'
    },
    imgCont: {
        width: '100%',
        height: 190,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    imgPlace: {
        maxHeight: '100%',
        height: '100%'
    }
};