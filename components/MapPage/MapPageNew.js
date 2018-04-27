import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, Button, Dimensions, Animated, PixelRatio, } from 'react-native';
import Interactable from 'react-native-interactable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as locationActions from '../../actions/locationActions';
import * as uiActions from '../../actions/uiActions'
import UserInfo from '../../containers/MapPage/Menu/UserInfo';
import MenuList from '../../containers/MapPage/Menu/MenuList';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import PlaceMarker from './parts/PlaceMarker';
import CalloutView from './parts/CalloutView';
import ParkTabs from './parts/ParkTabs/ParkTabs';
import TopButtons from './parts/TopButtons';

const Screen = Dimensions.get('window');
const SideMenuWidth = Math.floor( Screen.width * 0.8 );
const RemainingWidth = Screen.width - SideMenuWidth;

class MapPage extends Component {
    constructor(props){
        super(props);
        this.ratio = PixelRatio.get();

        this.state = {
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

    hideColloutView(){
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

    render() {
        const navigator = this.props.navigator;
        const location = this.props.location;
        const markers = this.props.markersOnMap;
        const markerInfo = this.state.markerInfo;
        this._deltaX = new Animated.Value(0);

        return (

                <Interactable.View
                    style={styles.interactable}
                    ref='menuInstance'
                    onSnap={this.toggleMenu.bind(this)}
                    horizontalOnly={true}
                    snapPoints={[{x: 0}, {x: -SideMenuWidth}]}
                    boundaries={{left: -SideMenuWidth}}
                    animatedValueX={this._deltaX}
                    initialPosition={{x: -SideMenuWidth}}>
                    <View style={styles.mapPage}>
                        <View style={styles.sideMenu}>
                            <UserInfo/>
                            <MenuList navigator={this.props.navigator} />
                        </View>
                        <View style={styles.mapContainer}>
                            <MapView style={styles.map}
                                     onPress={() => this.hideColloutView()}
                                     onPanDrag={(e) => this.mapDrag(e)}
                                     initialRegion={{
                                            latitude: location.lat,
                                            longitude: location.lon,
                                            latitudeDelta: 0.0922,
                                            longitudeDelta: 0.0421}}>
                                {Array.prototype.map.call(markers,(marker, i)=>(
                                    <Marker
                                        onPress={e => this.showCalloutView(e,i,marker)}
                                        key={`marker-${i}`}
                                        coordinate={{latitude: Number(marker.lat) , longitude: Number(marker.lon)}}>
                                        <PlaceMarker marker={marker} />
                                    </Marker>
                                ))}
                            </MapView>

                            <View style={{...styles.callout,
                                display: (this.state.callout.visible)? 'flex' : 'none' ,
                                top: this.state.callout.top,
                                left: this.state.callout.left
                                }}>
                                <CalloutView marker={markerInfo}  />
                            </View>

                            <TopButtons
                                toggleMenu={{openMenu: this.openMenu.bind(this), closeMenu: this.closeMenu.bind(this)}}
                                style={styles.header} />
                            <Interactable.View
                                verticalOnly={true}
                                snapPoints={[{y: 0}, {y: 418}]}
                                boundaries={{top: -300}}
                                initialPosition={{y: 0}}
                                style={styles.parkTabs}>

                                <Animated.View style={{
                                opacity: this._deltaX.interpolate({
                                    inputRange: [-SideMenuWidth, 0],
                                    outputRange: [1, 0]
                                })
                            }}>
                                    <ParkTabs />
                                </Animated.View>
                            </Interactable.View>
                        </View>
                    </View>
                </Interactable.View>
        );
    }

    toggleMenu(event) {
        if(event.nativeEvent.index == 0){
            console.log('openMenu');
            this.props.uiActions.toggleMenu(true);
        } else {
            console.log('closeMenu');
            this.props.uiActions.toggleMenu(false);
        }
    }
    openMenu() {
        this.props.uiActions.toggleMenu(true);
        this._deltaX.setValue(0);
        this.refs['menuInstance'].setVelocity({x: 2000});
    }
    closeMenu() {
        this.props.uiActions.toggleMenu(false);
        this._deltaX.setValue(-SideMenuWidth);
        this.refs['menuInstance'].setVelocity({x: -2000});
    }
}

const styles = {
    callout: {
        position: 'absolute',
        top: 0,
        left: 0,
        transform: [
            { translateX: - 70 },
            { translateY: - 190 },

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
};

function mapStateToProps (store) {

    return {
        location: store.location,
        fastPlaces: store.places.fastParkingPlaces,
        markersOnMap: store.places.markersOnMap
    }
}

function mapDispatchToProps(dispatch) {
    return {
        locationActions: bindActionCreators(locationActions, dispatch),
        uiActions: bindActionCreators(uiActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapPage)