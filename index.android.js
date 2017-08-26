
import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';
import { Provider } from 'react-redux'
import App from './containers/App'
import store from './store/configureStore'

export default class FP extends Component {
  render() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
  }
}



AppRegistry.registerComponent('FP', () => FP);
