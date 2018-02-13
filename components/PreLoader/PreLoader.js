/**
 * Created by Yaroslav on 13.02.2018.
 */
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as locationActions from '../../actions/locationActions';

class PreLoader extends Component {

    goToMapPage(screenTitle){
         this.props.navigator.push({
         title: screenTitle,
         animationType: 'VerticalUpSwipeJump'
         });
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
        }

        function error(err) {
            /*--тут код для получения координат по IP--*/
            self.props.locationActions.setNewLocation({
                lat: 60.1681755487777,
                lon: 24.9408531187777
            });
            self.goToMapPage('MapPage');
            /*--тут код для получения координат по IP--*/

        }

        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    render() {
        const location = this.props.location;
        return (
            <View style={styles.mapPage}>
                <Text style={{fontSize: 25}}>
                    Прелоадер
                </Text>
                <View>
                    <Text>latitude: {location.lat}</Text>
                </View>
                <View>
                    <Text>longitude: {location.lon}</Text>
                </View>
                <Button title={'Назад'} onPress={this.goToMapPage.bind(this,'MapPage')}/>
            </View>
        )
    }
}

const styles = {

};

function mapStateToProps (store) {

    return {
        location: store.location
    }
}

function mapDispatchToProps(dispatch) {
    return {
        locationActions: bindActionCreators(locationActions, dispatch)
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
