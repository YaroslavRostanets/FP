/**
 * Created by Yaroslav on 22.12.2017.
 */

import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class Info extends Component {

    goToHome(screenTitle){
        this.props.navigator.pop();
        /*
        this.props.navigator.push({
            title: screenTitle,
            animationType: 'VerticalDownSwipeJump'
        })
        */
    }


    render() {

        return (
            <View style={styles.mapPage}>
                <Text style={{fontSize: 25}}>
                    Экран информации
                </Text>
                <Button title={'Назад'} onPress={this.goToHome.bind(this,'MapPage')}/>
            </View>
        )
    }
}

const styles = {

};

export default Info
