import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, Button, Dimensions, Animated, PixelRatio, BackHandler } from 'react-native';
import Interactable from 'react-native-interactable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as locationActions from '../../actions/locationActions';
import * as uiActions from '../../actions/uiActions';
import * as placesActions from '../../actions/placesActions';
import UserInfo from '../../containers/MapPage/Menu/UserInfo';
import MenuList from '../../containers/MapPage/Menu/MenuList';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import PlaceMarker from './parts/PlaceMarker';
import CalloutView from './parts/CalloutView';
import ParkTabs from './parts/ParkTabs/ParkTabs';
import MenuBtn from './parts/MenuBtn';
import UserCenterBtn from './parts/UserCenterBtn';
import Loader from '../layers/loader';
import RouteView from './parts/RouteView';


const Screen = Dimensions.get('window');
const SideMenuWidth = Math.floor( Screen.width * 0.8 );
const RemainingWidth = Screen.width - SideMenuWidth;

class MapPage extends Component {
    constructor(props){
        super(props);
        this.ratio = PixelRatio.get();

        this.state = {
            showOneMarker: '',
            markerInfo: {},
            callout: {
                visible: false,
                top: 0,
                left: 0
            },
        };
    }

    showCalloutView(e,i,marker){
        let self = this;

        self.setState({
            markerInfo: marker,
            callout: {
                visible: false,
            }
        });

        if (!this.props.isRouteDetail){
            setTimeout(function(){
                self.setState({
                    callout: {
                        visible: true,
                        top: Screen.height / 2,
                        left: Screen.width / 2
                    }
                });
            },150);
        }

    }

    hideCalloutView(){
        this.setState({
            callout: {
                visible: false
            }
        });
    }

    mapDrag(e){
        this.setState({
            callout: {
                visible: false
            }
        });
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress',() => {
            if( this.props.navigator.navigationContext.currentRoute.title == 'MapPage'){
                BackHandler.exitApp();
                return true;
            } else {
                this.props.navigator.pop();
                return true;
            }
        });
    }

    render() {
        const dMarker = this.props.directionsMarker;
        const navigator = this.props.navigator;
        const location = this.props.location;
        const markers = this.props.markersOnMap;
        const markerInfo = this.state.markerInfo;
        this._deltaX = new Animated.Value(0);

        return (
            <View>
                <Interactable.View
                    style={styles.interactable}
                    ref='menuInstance'
                    onSnap={this.toggleMenu.bind(this)}
                    horizontalOnly={true}
                    snapPoints={[{x: 0}, {x: -SideMenuWidth}]}
                    boundaries={{left: -SideMenuWidth}}
                    animatedValueX={this._deltaX}
                    initialPosition={{x: -SideMenuWidth}}>
                    <View style={{...styles.mapPage}}>
                        <View style={styles.sideMenu}>
                            <UserInfo/>
                            <MenuList navigator={this.props.navigator} />
                        </View>
                        <View style={styles.mapContainer}>
                            <MapView style={styles.map}
                                     onPress={() => this.hideColloutView()}
                                     onPanDrag={(e) => this.mapDrag(e)}
                                     showsUserLocation = {false}
                                     ref={ref => { this.map = ref; }}
                                     initialRegion={{
                                            latitude: location.lat,
                                            longitude: location.lon,
                                            latitudeDelta: 0.0920,
                                            longitudeDelta: 0.0421}}>

                                <Marker coordinate={{
                                    latitude: this.props.location.lat,
                                    longitude: this.props.location.lon
                                }} />
                                {Array.prototype.map.call(markers,(marker, i)=>(
                                    <Marker
                                        onPress={e => this.showCalloutView(e,i,marker)}
                                        key={`marker-${i}`}
                                        coordinate={{latitude: Number(marker.lat) , longitude: Number(marker.lon)}}>
                                        <PlaceMarker marker={marker} />
                                    </Marker>
                                ))}
                                {(this.props.directionsMarker) ? <RouteView /> : null}
                            </MapView>

                            <View style={{...styles.callout,
                                display: (this.state.callout.visible)? 'flex' : 'none' ,
                                top: this.state.callout.top,
                                left: this.state.callout.left
                                }}>
                                <CalloutView
                                    location={this.props.location}
                                    marker={markerInfo}
                                    getPlaceById={this.props.placesActions.getPlaceById.bind(this)}
                                    getDirection={this.props.placesActions.getDirections}
                                    setNewLocation={this.props.locationActions.setNewLocation.bind(this)}
                                    hideCalloutView={this.hideCalloutView.bind(this)}
                                    navigator={this.props.navigator}
                                />
                            </View>

                            <MenuBtn toggleMenu={{openMenu: this.openMenu.bind(this), closeMenu: this.closeMenu.bind(this)}} />
                            <UserCenterBtn style={styles.userCenterBtn} setMapCenter={this.setMapCenter.bind(this)}/>
                            <Interactable.View
                                verticalOnly={true}
                                snapPoints={[{y: (dMarker) ? 310 : 0}, {y: 418}]}
                                boundaries={{top: -300}}
                                initialPosition={{y: (dMarker) ? 310 : 0}}
                                ref="botBar"
                                style={styles.parkTabs}>
                                <Animated.View style={{
                                opacity: this._deltaX.interpolate({
                                    inputRange: [-SideMenuWidth, 0],
                                    outputRange: [1, 0]
                                })
                            }}>
                                    <ParkTabs
                                        hideCalloutView={this.hideCalloutView.bind(this)}
                                        hideBotBar={function(){this.refs['botBar'].setVelocity({y: 2250});}.bind(this)}
                                        botBarToBottom={this.botBarToBottom.bind(this)} />
                                </Animated.View>
                            </Interactable.View>
                        </View>
                    </View>
                </Interactable.View>
                {(this.props.showLoader) ? <Loader /> : null}
            </View>

        );
    }

    botBarToBottom(showMarker){
        this.map.animateToCoordinate({
            latitude: Number(showMarker.lat),
            longitude: Number(showMarker.lon)
        }, 150);
        this.showCalloutView('','',showMarker);
        this.setState({
            showOneMarker: showMarker,
        });

        this.refs['botBar'].setVelocity({y: 2250});
    }

    toggleMenu(event) {

        if(event.nativeEvent.index == 0){
            this.props.uiActions.toggleMenu(true);
        } else {
            this.props.uiActions.toggleMenu(false);
        }
    }
    openMenu() {

        this._deltaX.setValue(0);
        this.refs['menuInstance'].setVelocity({x: 2000});
        this.props.uiActions.toggleMenu(true);
    }
    closeMenu() {
        this._deltaX.setValue(-SideMenuWidth);
        this.refs['menuInstance'].setVelocity({x: -2000});
        this.props.uiActions.toggleMenu(false);
    }

    setMapCenter() {
        this.map.animateToCoordinate({
            latitude: this.props.location.lat,
            longitude: this.props.location.lon
        }, 150);
    }

}

const styles = {
    callout: {
        position: 'absolute',
        top: 0,
        left: 0,
        transform: [
            { translateX: - 70 },
            { translateY: - 230 }
        ],
    },
    parkTabs: {
        position: 'absolute',
        bottom: 0,
        zIndex: 1002,
        left: 0,
        width: Screen.width,
    },
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
        height: 2,
        paddingLeft: 20,
        flexDirection: 'row',
        backgroundColor: 'red',
        alignItems: 'center',
        zIndex: 1001,
        position: 'absolute',
        overflow: 'visible'
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
};

function mapStateToProps (store) {

    return {
        directionsMarker: store.places.route.markerId,
        location: store.location,
        fastPlaces: store.places.fastParkingPlaces,
        markersOnMap: store.places.markersOnMap,
        showLoader:  store.places.showLoader,
        isRouteDetail: store.places.route.markerId
    }
}

function mapDispatchToProps(dispatch) {
    return {
        locationActions: bindActionCreators(locationActions, dispatch),
        uiActions: bindActionCreators(uiActions, dispatch),
        placesActions: bindActionCreators(placesActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapPage)