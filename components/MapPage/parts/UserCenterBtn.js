/**
 * Created by Yaroslav on 30.05.2018.
 */

import React, { Component } from 'react';
import Ripple from 'react-native-material-ripple';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import store from '../../../store/configureStore';
import * as locationActions from '../../../actions/locationActions'
import Icon from 'react-native-vector-icons/FontAwesome';
import { API } from '../../../constants/appConfig';
import { LAT, LON } from '../../../constants/Location'


class UserCenterBtn extends Component {

    render() {

        return (
            <Ripple
                onPress={this.setUserCenter.bind(this)}
                rippleColor={'#FFFFFF'}
                rippleOpacity={0.6}
                rippleDuration={800}
                style={styles.stdBut}>
                <Icon name="map-marker" style={styles.ico} />
            </Ripple>
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
    stdBut: {
        height: 50,
        width: 50,
        borderRadius: 3,
        backgroundColor: '#F2F5F7',
        borderWidth: 1,
        borderColor: '#D3DFE1',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: 'absolute',
        top: 15,
        right: 13
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
        locationActions: bindActionCreators(locationActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCenterBtn);
