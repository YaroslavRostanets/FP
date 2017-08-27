/**
 * Created by Yaroslav on 26.08.2017.
 */
import React, { Component } from 'react';
import { Text, View, Image, TouchableHighlight, StyleSheet } from 'react-native';

class UserInfo extends Component {

    render(){
        return (
            <View style={styles.userInfo}>
                <View style={styles.imgCont}>
                    <Image resizeMode='contain' style={styles.avatar} source={require('../../../images/photo.jpg')}></Image>
                </View>
                <View>
                    <Text style={styles.name}>Kim chen</Text>
                    <Text style={styles.car}>BMW M3</Text>
                    <View style={styles.rankCont}>
                        <Text style={styles.rank}>rank:</Text>
                        <View style={styles.raite}>
                            <Text style={styles.oneActiveP}>P</Text>
                            <Text style={styles.oneActiveP}>P</Text>
                            <Text style={styles.oneActiveP}>P</Text>
                            <Text style={styles.oneP}>P</Text>
                            <Text style={styles.oneP}>P</Text>
                        </View>
                    </View>
                </View>
            </View>
            )
    }
}


const styles = StyleSheet.create({
    userInfo: {
        height: 110,
        backgroundColor: '#F3F6F8',
        paddingTop: 18,
        paddingBottom: 18,
        paddingLeft: 15,
        paddingRight: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#CFDDE1',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        display: 'flex',
        flexDirection: 'row'
    },
    imgCont: {
        height: 75,
        width: 75,
        borderRadius: 40,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 35,
    },
    avatar: {
        overlayColor: '#F3F6F8',
        resizeMode: 'contain',
        width: 75,
        height: 75,
        borderRadius: 150
    },
    name: {
        color: '#5093DF',
        fontSize: 16
    },
    car: {
        color: '#5093DF',
        fontSize: 16
    },
    rank: {
        fontSize: 13,
        color: '#5093DF',
    },
    rankCont: {
        marginTop: 7
    },
    raite: {
        display: 'flex',
        flexDirection: 'row'
    },
    oneActiveP: {
        width: 15,
        height: 15,
        backgroundColor: '#65B7FC',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 12,
        marginRight: 1,
        textAlignVertical: 'center',
        lineHeight: 15
    },
    oneP: {
        width: 15,
        height: 15,
        backgroundColor: '#D1D4D7',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 13,
        color: '#FFFFFF',
        textAlignVertical: 'center',
        lineHeight: 15
    }



//box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);
});

export default UserInfo