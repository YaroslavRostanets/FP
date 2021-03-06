/**
 * Created by Yaroslav on 31.05.2018.
 */
import React, { Component } from 'react';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_APIKEY} from '../../../constants/appConfig';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as placesActions from '../../../actions/placesActions';

class RouteView extends Component {

    setRouteData(calculatedData) {
        this.props.placesActions.setRouteData({
            distance: calculatedData.distance,
            duration: calculatedData.duration
        });
        this.props.placesActions.hideLoader();
    }

    render() {
        let origin = this.props.origin;
        let destination = this.props.destination;

        return (
            <MapViewDirections
                origin={origin}
                destination={destination}
                mode={'driving'}
                strokeWidth={3}
                strokeColor="hotpink"
                apikey={GOOGLE_MAPS_APIKEY}
                onReady={this.setRouteData.bind(this)}
                onError={(errorMessage) => {console.log(errorMessage) }}
            />
        );
    }

}

function mapStateToProps (store) {

    return {
        location: store.location,
        origin: store.places.route.origin,
        destination: store.places.route.destination
    }
}

function mapDispatchToProps(dispatch) {
    return {
        placesActions: bindActionCreators(placesActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteView)