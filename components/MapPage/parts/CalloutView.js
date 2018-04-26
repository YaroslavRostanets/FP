/**
 * Created by Yaroslav on 25.04.2018.
 */

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class CalloutView extends Component {

    render (){

        return(
            <View style={styles.container}>
                <View style={styles.topInfo}>
                    <View style={styles.parkSign}>
                        <Image style={styles.parkSignImg} source={require('../../../images/thumb1.png')}/>
                        <Text style={styles.text}>2h</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>8-17</Text>
                        <Text style={styles.text}>(10-15)</Text>
                        <Text style={styles.text}>18-19</Text>
                    </View>
                </View>
                <View style={styles.rowBtns}>
                    <TouchableHighlight onPress={ () => console.log('press Btn') } style={styles.stdBut}>
                        <Icon name="info" style={styles.ico} />
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.stdBut}>
                        <Icon name="star-o" style={styles.ico} />
                    </TouchableHighlight>
                    {/*<TouchableHighlight style={styles.routeMapBtn}>*/}
                        {/*<View style={styles.routeMapBtnIn}>*/}
                            {/*<Icon name="car" style={styles.ico} />*/}
                            {/*<Text>*/}
                                {/*1234m*/}
                            {/*</Text>*/}
                        {/*</View>*/}
                    {/*</TouchableHighlight>*/}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#FFFFFF',
        width: 140,
        padding: 5,
        zIndex: 1009,
        borderRadius: 4,
        overflow: 'visible',
    },
    interval: {

    },
    topInfo: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1
    },
    parkSign: {
        width: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    parkSignImg: {
        height: 50,
        width: 50
    },
    parkTime: {
        width: '50%'
    },
    text: {
        color: '#6F7071',
        fontSize: 16,
        textAlign: 'center'
    },
    rowBtns: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    routeMapBtn: {
        height: 30,
        borderRadius: 15,
        backgroundColor: '#F2F5F7',
        borderWidth: 1,
        borderColor: '#D3DFE1',
        display: "flex",
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    routeMapBtnIn: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    stdBut: {
        height: 50,
        width: 50,
        borderRadius: 3,
        backgroundColor: '#F2F5F7',
        borderWidth: 1,
        borderColor: '#D3DFE1',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10
    },
    ico: {
        color: "#6F7071",
        fontSize: 26
    },
    botArrow: {
        position: 'absolute',
        bottom: -15,
        left: '50%',
        width: 26,
        marginLeft: -13,
        height: 30,
        backgroundColor: '#FFFFFF'
    }
});

export default CalloutView
