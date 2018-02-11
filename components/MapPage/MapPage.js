/**
 * Created by Yaroslav on 25.08.2017.
 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as locationActions from '../../actions/locationActions';
import { View, Text, Button, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Menu from '../../containers/MapPage/Menu/Menu';
import TopButtons from '../../containers/MapPage/TopButtons';
import ParkTabs from '../../containers/MapPage/ParkTabs/ParkTabs';


class MapPage extends Component {

    goToDetail(){
        this.props.navigator.push({
            title:'ParkDetail'
        })
    }

    setCoords(){
        this.props.locationActions.setNewLocation(true);
    }

    componentDidMount(){
        console.log("-location-");
        this.props.locationActions.setNewLocation({
            lat: 60.16817554863222,
            lon: 24.94085311889222
        });
        let options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        };

        function success(position) {
            let coordinates = position.coords;
            this.props.locationActions.setNewLocation({
                lat: coordinates.lat,
                lon: coordinates.lon
            });
        }

        function error(err) {

            console.warn(`ERROR(${err.code}): ${err.message}`);

        }

        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    render() {
        const navigator = this.props.navigator;
        const location = this.props.location;

        return (
            <View style={styles.mapPage}>
                <Menu navigator={navigator} style={styles.menu}/>
                <View style={{position: 'relative'}}>
                    <TopButtons />
                    <Button
                        onPress={this.setCoords}
                        title="Learn More"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                    <MapView style={styles.map}
                             initialRegion={{
                        latitude: location.lat,
                        longitude: location.lon,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421}}>
                        <Marker
                            coordinate={{latitude: location.lat, longitude: location.lon}}
                        />
                    </MapView>
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

function mapStateToProps (store) {
    console.log(store);
    return {
        location: store.location
    }
}

function mapDispatchToProps(dispatch) {
    return {
        locationActions: bindActionCreators(locationActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MapPage)

