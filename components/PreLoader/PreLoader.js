/**
 * Created by Yaroslav on 13.02.2018.
 */
import React, { Component } from 'react';
import { View, Text, Button, Image, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as locationActions from '../../actions/locationActions';
import * as placesActions from '../../actions/placesActions';
import { API } from '../../constants/appConfig';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import { LAT, LON } from '../../constants/Location'

const loaderWidth = Dimensions.get('window').width * 0.635;

class PreLoader extends Component {
    getDayIndex(){
        return new Date().getDay();
    }

    goToMapPage(screenTitle){
        this.props.navigator.push({
            title: screenTitle,
            animationType: 'VerticalDownSwipeJump'
        })
    }

    componentWillReceiveProps(nextProps){
        //this.goToMapPage('MapPage');
    }

    componentDidMount() {
        const self = this;
        let options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function success(position) {
            self.props.locationActions.setNewLocation({
                lat: position.coords.latitude,
                lon: position.coords.longitude
            });

            self.props.placesActions.getPlaces(
                {   "lat":position.coords.latitude,
                    "lon":position.coords.longitude,
                    "dayIndex": self.getDayIndex(),
                    "navigator": self.props.navigator }
            );

        }

        function error(err) {
            /*--тут код для получения координат по IP--*/
            const myRequest = new Request(`${API}location/`);

            fetch(myRequest)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        throw new Error('Something went wrong on api server!');
                    }
                })
                .then(response => {
                    /*--Включаем для разработки в Киеве--*/
                    setDefaultLocation();
                    self.props.placesActions.getPlaces({"lat":LAT, "lon":LON, "dayIndex": self.getDayIndex(), "navigator": self.props.navigator });
                    /*--конец Включаем для разработки в Киеве--*/

                    /*--Отключаем для разработки--*/
                    // self.props.locationActions.setNewLocation({
                    //     lat: response.latitude,
                    //     lon: response.longitude
                    // });
                    // self.props.placesActions.getPlaces({"lat":response.latitude, "lon":response.longitude, "dayIndex": this.getDayIndex() });
                    //self.goToMapPage('MapPage');
                }).catch(error => {
                console.error(error);
                setDefaultLocation();
                self.props.placesActions.getPlaces({"lat":LAT, "lon":LON, "dayIndex": self.getDayIndex() });

            });
            function setDefaultLocation(){
                self.props.locationActions.setNewLocation({
                    lat: LAT,
                    lon: LON
                });
            }

        }

        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    render() {
        const location = this.props.location;
        return (
            <View style={styles.preLoader}>
                {/*<Image style={styles.background} source={require('../../images/preloader-bg.jpg')} />*/}
                <View style={styles.loadContain}>
                    <Image style={styles.loadContainImg} source={require('../../images/logo2.png')} />
                </View>
                <View style={styles.loadAnimation}>
                    <Bars style={{display:"flex",alignItems:"center", justifyContent: "center"}} size={16} color="#FFFFFF" />
                </View>
                <View style={styles.dev}>
                    <Text>latitude: {location.lat}</Text>
                    <Text>longitude: {location.lon}</Text>
                </View>
            </View>
        )
    }
}

const styles = {
    preLoader: {
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: "100%",
        width: "100%",
        flex: 1,
        backgroundColor: "#FF6D64"
    },
    background: {
        flexGrow:1,
        height:null,
        width:null,
        alignItems: 'center',
        justifyContent:'center'
    },
    loadAnimation: {
        position: "absolute",
        width: "100%",
        bottom: "25%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        flex: 1
    },
    loadImage: {
        display: "flex",
        width: "100%",
        height: 75,
        flexGrow: 1
    },
    dev: {
        position: "absolute",
        left: 0,
        bottom: 0,
        backgroundColor: "#FFFFFF"
    },
    loadContain: {
        width: 250,
        height: 250,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10%"
    },
    loadContainImg: {
        width: 250,
        height: 250,
        display: "flex",
        flexGrow: 1,
        marginLeft: "auto",
        marginRight: "auto"
    }
};

function mapStateToProps (store) {

    return {
        location: store.location,
        places: store.places.fastParkingPlaces
    }
}

function mapDispatchToProps(dispatch) {
    return {
        locationActions: bindActionCreators(locationActions, dispatch),
        placesActions: bindActionCreators(placesActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PreLoader)

/*
 PushFromRight: SceneConfig;
 FloatFromRight: SceneConfig;
 FloatFromLeft: SceneConfig;
 FloatFromBottom: SceneConfig;
 FloatFromBottomAndroid: SceneConfig;
 FadeAndroid: SceneConfig;
 HorizontalSwipeJump: SceneConfig;
 HorizontalSwipeJumpFromRight: SceneConfig;
 VerticalUpSwipeJump: SceneConfig;
 VerticalDownSwipeJump: SceneConfig;
 */
