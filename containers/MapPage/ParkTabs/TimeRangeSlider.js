/**
 * Created by Yaroslav on 14.12.2017.
 */

import MultiSlider from 'react-native-MultiSlider';

import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class TimeRangeSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leftValue: 0,
            rightValue: 0.5,
        };
    }

    render(){

        return (
            <View style = {{flex: 1, backgroundColor: 'white'}}>
                <View style = {styles.container}>
                    <MultiSlider
                        trackWidth = {300}
                        defaultTrackColor = {'#e3e3e3'}
                        leftThumbColor = {'red'}
                        rightThumbColor = {'blue'}
                        rangeColor = {'pink'}
                        leftValue = {this.state.leftValue}
                        rightValue = {this.state.rightValue}
                        onLeftValueChange = {(leftValue) => this.setState({leftValue})}
                        onRightValueChange = {(rightValue) => this.setState({rightValue})}
                    />
                </View>
                <TouchableOpacity onPress = {() => this.onPress(true)}>
                    <View style = {styles.button}>
                        <Text>Click to disable</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => this.onPress(false)}>
                    <View style = {styles.button}>
                        <Text>Click to able</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

styles = {
    button: {

    },
    container: {

    }
};

export default TimeRangeSlider



