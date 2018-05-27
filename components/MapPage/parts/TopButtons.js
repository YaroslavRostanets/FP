/**
 * Created by Yaroslav on 26.08.2017.
 */
import React, { Component } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import store from '../../../store/configureStore';
import * as uiActions from '../../../actions/uiActions';
import * as locationActions from '../../../actions/locationActions'
import Icon from 'react-native-vector-icons/FontAwesome';
import { API } from '../../../constants/appConfig';
import { LAT, LON } from '../../../constants/Location'


class TopButtons extends Component {

    toggleMenu(){
        if(this.props.menuOpen){
            this.props.toggleMenu.closeMenu();
        } else {
            this.props.toggleMenu.openMenu();
        }
    }


    render() {

        return (
            <View style={styles.topButtons}>
                <Ripple
                    rippleColor={'#FFFFFF'}
                    rippleOpacity={0.6}
                    rippleDuration={800}
                    underlayColor={"#5296E7"}
                    onPress={this.toggleMenu.bind(this)} style={styles.stdBut}>
                    <Icon name="reorder" style={styles.ico} />
                </Ripple>

                <Ripple
                    onPress={this.setUserCenter.bind(this)}
                    rippleColor={'#FFFFFF'}
                    rippleOpacity={0.6}
                    rippleDuration={800}
                    style={styles.stdBut}>
                    <Icon name="map-marker" style={styles.ico} />
                </Ripple>
            </View>
        );
    }

    setUserCenter() {
        let self = this;

        let options = {
            enableHighAccuracy: false,
            timeout: 4000,
            maximumAge: 0
        };

        function success(position) {
            self.props.locationActions.setNewLocation({
                lat: position.coords.latitude,
                lon: position.coords.longitude
            });

            self.props.setMapCenter();
        }

        function error() {
            const myRequest = new Request(`${API}location/`);

            fetch(myRequest)
                .then(response => {
                    if (response.status === 200) {
                        console.log('response: ', response);
                        return response.json();
                    } else {
                        throw new Error('Something went wrong on api server!');
                    }
                })
                .then(response => {

                    self.props.locationActions.setNewLocation({
                        lat: response.latitude,
                        lon: response.longitude
                    });
                    self.props.setMapCenter();
                }).catch(error => {

                setDefaultLocation();
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

}

const styles = {
    topButtons: {
        position: "absolute",
        top: 15,
        width: "100%",
        paddingRight: "3.5%",
        paddingLeft: "3.5%",
        zIndex: 9,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    stdBut: {
        height: 50,
        width: 50,
        borderRadius: 3,
        backgroundColor: '#F2F5F7',
        borderWidth: 1,
        borderColor: '#D3DFE1',
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    ico: {
        color: "#6F7071",
        fontSize: 26
    }
};

function mapStateToProps (store) {
    return {
        menuOpen: store.ui.menuOpen,
        location: store.location
    }
}

function mapDispatchToProps(dispatch) {
    return {
        uiActions: bindActionCreators(uiActions, dispatch),
        locationActions: bindActionCreators(locationActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopButtons);
