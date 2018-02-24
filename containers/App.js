/**
 * Created by Yaroslav on 25.08.2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routes } from '../constants/routes';
import { Text } from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import MapPage from '../components/MapPage/MapPageNew';
import ParkDetail from '../containers/ParkDetail';
import Info from '../components/Info/Info';
import Options from '../components/Options/Options';
import PreLoader from '../components/PreLoader/PreLoader';
import * as uiActions from '../actions/uiActions';

class App extends Component {
    constructor(props){
        super(props);
        this.routes = routes;
    }

    configureScene (route, routeStack) {
        return Navigator.SceneConfigs[route.animationType];
    }

    navigatorRenderScene(route, navigator){
        //console.log('route: ',navigator.title);
        switch (route.title){
            case 'PreLoader':
                return (
                    <PreLoader navigator={navigator}/>
                );
            case 'MapPage':
                return (
                    <MapPage navigator={navigator}/>
                );
            case 'ParkDetail':
                return (
                    <ParkDetail navigator={navigator}/>
                );
            case 'Info':
                return (
                    <Info navigator={navigator}/>
                );
            case 'Options':
                return (
                    <Options navigator={navigator}/>
                );
            default:
                return (
                  <Text>404</Text>
                )
        }
    }

    render() {

        const routes = this.routes;
        //console.log('initial: ',routes[4]);
        return (
            <Navigator
                renderScene={this.navigatorRenderScene}
                initialRoute={routes[4]}
                initialRouteStack={routes}
                configureScene = {this.configureScene}
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
