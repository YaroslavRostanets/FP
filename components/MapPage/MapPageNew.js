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
import ParkTabs from '../../containers/MapPage/ParkTabs/ParkTabs';
import TopButtons from '../../containers/MapPage/TopButtons';

const Screen = Dimensions.get('window');
const SideMenuWidth = Math.floor( Screen.width * 0.8 );
const RemainingWidth = Screen.width - SideMenuWidth;

class MapPage extends Component {
    render() {
        const navigator = this.props.navigator;
        const location = this.props.location;
        const markers = this.props.markersOnMap;

        return (
            <View style={styles.container}>

                <View style={styles.sideMenuContainer} pointerEvents='box-none'>
                    <Interactable.View
                        ref='menuInstance'
                        horizontalOnly={true}
                        snapPoints={[{x: 0}, {x: -SideMenuWidth}]}
                        boundaries={{right: RemainingWidth/4}}
                        initialPosition={{x: -SideMenuWidth}}>
                        <View style={styles.sideMenu}>
                            <UserInfo/>
                            <MenuList navigator={this.props.navigator} />
                        </View>
                    </Interactable.View>
                </View>

                <View style={styles.body}>
                    <Interactable.View ref="mapInstance"
                                       horizontalOnly={true}
                                       snapPoints={[{x: 0}, {x: SideMenuWidth}]}
                                       initialPosition={{x: 0}}>
                        <MapView style={styles.map}
                                 initialRegion={{
                        latitude: location.lat,
                        longitude: location.lon,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421}}>
                            {Array.prototype.map.call(markers,(marker)=>(
                                <Marker
                                    key={marker.id}
                                    coordinate={{latitude: Number(marker.lat) , longitude: Number(marker.lon)}}
                                />
                            ))}
                        </MapView>
                        <TopButtons menuActions={{
                            openMenu: this.openMenu.bind(this),
                            closeMenu: this.closeMenu.bind(this)
                        }} style={styles.header} />
                        <ParkTabs/>
                    </Interactable.View>
                </View>



            </View>
        );
    }
    openMenu() {
        this.refs['menuInstance'].setVelocity({x: 2000});
        this.refs['mapInstance'].setVelocity({x: 2000});
    }
    closeMenu() {
        this.refs['menuInstance'].setVelocity({x: -2000});
        this.refs['mapInstance'].setVelocity({x: -2000});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: 'white',
    },
    sideMenuContainer: {
        position: 'absolute',
        top: 0,
        left: -RemainingWidth,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        zIndex: 1002
    },
    sideMenu: {
        left: 0,
        width: Screen.width,
        paddingLeft: RemainingWidth,
        flex: 1,
        backgroundColor: '#aaa'
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
        width: "100%",
        minWidth: "100%",
        height: "100%",
        backgroundColor: "#3FDFFF"
    },
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