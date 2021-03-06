/**
 * Created by Yaroslav on 25.08.2017.
 */
import React, { Component } from 'react';
import { Text, View, StyleSheet, Animated, Dimensions, Button } from 'react-native';
import { connect } from 'react-redux'
import store from '../../../store/configureStore'
import UserInfo from './UserInfo'
import MenuList from './MenuList'


class Menu extends Component {
    constructor(props) {
        super(props);
        this.width = Dimensions.get('window').width;
        this.menuSlideWidth = (this.width * 0.8); //80% ширины экрана

        this.menuStyles = {
            width: "80%",
            backgroundColor: "#FFFFFF",
            flex: 0,
            position: "relative",
            zIndex: 9,
        }
    }

    state = {
        fadeAnim: new Animated.Value(0)
    };



    render(){

        const menuOpen = this.props.menuOpen;

        return (
            <View style={this.menuStyles} >
                <UserInfo/>
                <MenuList navigator={this.props.navigator} />
                    <Text>Menu2</Text>
                    <Text>{+menuOpen}</Text>
                    <Text>
                        {this.width}
                    </Text>

            </View>

        )
    }
}

function mapStateToProps (store) {
    return {
        menuOpen: store.ui.menuOpen
    }
}

export default connect(mapStateToProps)(Menu);