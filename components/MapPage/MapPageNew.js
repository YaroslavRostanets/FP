import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, Button, Dimensions } from 'react-native';
import Interactable from 'react-native-interactable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as locationActions from '../../actions/locationActions';
import * as uiActions from '../../actions/uiActions'
import Menu from '../../containers/MapPage/Menu/Menu';
import UserInfo from '../../containers/MapPage/Menu/UserInfo';
import MenuList from '../../containers/MapPage/Menu/MenuList';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import PlaceMarker from './parts/PlaceMarker';
import ParkTabs from './parts/ParkTabs/ParkTabs';
import TopButtons from './parts/TopButtons';

const Screen = Dimensions.get('window');
const SideMenuWidth = Math.floor( Screen.width * 0.8 );
const RemainingWidth = Screen.width - SideMenuWidth;

class MapPage extends Component {

    render() {
        const navigator = this.props.navigator;
        const location = this.props.location;
        const markers = this.props.markersOnMap;

        return (

                <Interactable.View
                    style={styles.interactable}
                    ref='menuInstance'
                    horizontalOnly={true}
                    snapPoints={[{x: 0}, {x: -SideMenuWidth}]}
                    boundaries={{right: 0}}
                    initialPosition={{x: -SideMenuWidth}}>
                    <View style={styles.mapPage}>
                        <View style={styles.sideMenu}>
                            <UserInfo/>
                            <MenuList navigator={this.props.navigator} />
                        </View>
                        <View style={styles.mapContainer}>
                            <MapView style={styles.map}
                                     initialRegion={{
                                            latitude: location.lat,
                                            longitude: location.lon,
                                            latitudeDelta: 0.0922,
                                            longitudeDelta: 0.0421}}>
                                {Array.prototype.map.call(markers,(marker)=>(
                                    <Marker
                                        key={marker.id}
                                        coordinate={{latitude: Number(marker.lat) , longitude: Number(marker.lon)}}>
                                        <PlaceMarker marker={marker} />
                                    </Marker>
                                ))}
                            </MapView>
                            <TopButtons toggleMenu={{
                            openMenu: this.openMenu.bind(this),
                            closeMenu: this.closeMenu.bind(this)
                        }} style={styles.header} />
                            <ParkTabs/>
                        </View>
                    </View>
                </Interactable.View>
        );
    }


    openMenu() {
        this.refs['menuInstance'].setVelocity({x: 2000});
    }
    closeMenu() {
        this.refs['menuInstance'].setVelocity({x: -2000});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: 'red',
        height: '100%'
    },
    interactable: {
        height: "100%",
        width: Screen.width + SideMenuWidth
    },
    sideMenu: {
        left: 0,
        width: SideMenuWidth,
        paddingLeft: 0,
        backgroundColor: "#FFFFFF",
        flex: 0,
        position: "relative",
        zIndex: 9,
    },
    sideMenuTitle: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20
    },
    header: {
        height: 60,
        paddingLeft: 20,
        flexDirection: 'row',
        backgroundColor: 'red',
        alignItems: 'center',
        zIndex: 1001
    },
    body: {
        flex: 1,
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center'
    },
    menuIcon: {
        width: 30,
        height: 30
    },
    headerTitle: {
        marginLeft: 30,
        color: 'white',
        fontSize: 20
    },
    content: {
        fontSize: 18
    },
    map: {
        width: Screen.width,
        height: "100%"
    },
    mapPage: {
        overflow: "hidden",
        width: Screen.width,
        flex: 1,
        flexWrap: "nowrap",
        flexDirection: "row",
        position: "relative"
    },
    mapContainer: {
        height: "100%",
        width: Screen.width,
        display: "flex"
    }
});

function mapStateToProps (store) {

    return {
        location: store.location,
        fastPlaces: store.places.fastParkingPlaces,
        markersOnMap: store.places.markersOnMap,
        menuOpen: store.ui.menuOpen
    }
}

function mapDispatchToProps(dispatch) {
    return {
        locationActions: bindActionCreators(locationActions, dispatch),
        uiActions: bindActionCreators(uiActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapPage)