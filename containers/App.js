/**
 * Created by Yaroslav on 25.08.2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Text } from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components'
import MapPage from '../components/MapPage/MapPage';
import ParkDetail from '../containers/ParkDetail';
import * as uiActions from '../actions/uiActions'

class App extends Component {

    navigatorRenderScene(route, navigator){
        switch (route.title){
            case 'MapPage':
                return (
                    <MapPage navigator={navigator}/>
                );
            case 'ParkDetail':
                return (
                    <ParkDetail navigator={navigator}/>
                );
            default:
                return (
                  <Text>404</Text>
                )
        }
    }

    render() {
        const routes = [
            {title: 'MapPage', index: 0, parentProps: this.props},
            {title: 'ParkDetail', index: 1, parentProps: this.props},
        ];

        return (
            <Navigator
                renderScene={this.navigatorRenderScene}
                initialRoute={routes[0]}
                initialRouteStack={routes}
            />
        );

    }
}

function mapStateToProps (state) {
    return {
        state: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        uiActions: bindActionCreators(uiActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
