/**
 * Created by Yaroslav on 24.02.2018.
 */
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

class PlaceMarker extends Component {

    timeIntervalConvert(interval) {
        return (interval >= 60) ? {interval: interval / 60, measure: 'h'} : {interval: interval, measure: 'min'};
    }

    render (){
        const marker = this.props.marker;
        const interval = this.props.marker['time_interval'];


        return(
            <View style={styles.marker}>
                <Image style={styles.markerImg} source={require('../../../images/marker.png')} />
                <View style={styles.interval}>
                    <Text style={styles.time}>
                        {this.timeIntervalConvert(interval).interval}
                    </Text>
                    <Text style={styles.measure}>
                        {this.timeIntervalConvert(interval).measure}
                    </Text>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    marker: {
        height: 47,
        width: 35,
        display: "flex",
        position: "relative"
    },
    markerImg: {
        width: "100%",
        height: "100%",
    },
    interval: {
        position: "absolute",
        paddingTop: 3,
        top: 0,
        left: 0,
        width: "100%"
    },
    time: {
        fontSize: 14,
        textAlign: "center",
        fontWeight: "bold"
    },
    measure: {
        fontSize: 10,
        textAlign: "center",
        position: "relative",
        top: -5
    }
});

export default PlaceMarker
