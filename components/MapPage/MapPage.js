/**
 * Created by Yaroslav on 25.08.2017.
 */
import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import Menu from '../../containers/MapPage/Menu/Menu';
import TopButtons from '../../containers/MapPage/TopButtons'
import ParkTabs from '../../containers/MapPage/ParkTabs/ParkTabs'

class MapPage extends Component {
    goToDetail(){
        this.props.navigator.push({
            title:'ParkDetail'
        })
    }

    render() {
        const navigator = this.props.navigator;

        return (
            <View style={styles.mapPage}>
                <Menu navigator={navigator} style={styles.menu}/>
                <View style={{position: 'relative'}}>
                    <TopButtons />
                    <MapView style={styles.map}
                             initialRegion={{
                      latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421}}
                    />
                    <ParkTabs/>
                </View>
            </View>
        )
    }
}

const styles = {
    map: {
        width: "100%",
        minWidth: "100%",
        height: "103%"
    },
    mapPage: {
        overflow: "hidden",
        width: "100%",
        flex: 1,
        flexWrap: "nowrap",
        flexDirection: "row",
        position: "relative",
        marginLeft: "-80%"
    }
};

export default MapPage