/**
 * Created by Yaroslav on 25.08.2017.
 */
import React, { Component } from 'react';
import { Text, View, StyleSheet, Animated, Dimensions } from 'react-native';
import { connect } from 'react-redux'
import store from '../../../store/configureStore'
import UserInfo from './UserInfo'


class Menu extends Component {
    constructor(props) {
        super(props);
        this.width = Dimensions.get('window').width;
        this.menuSlideWidth = (this.width * 0.8); //80% ширины экрана

        this.menuStyles = {
            width: "80%",
            backgroundColor: "red",
            borderWidth: 1,
            borderColor: "#000000",
            flex: 0,
            position: "relative",
            zIndex: 9,
        }
    }

    state = {
        fadeAnim: new Animated.Value(0)
    };

    componentWillReceiveProps(){
        let marginLeft = (this.props.menuOpen)? 0 : this.menuSlideWidth;
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: marginLeft,
                duration: 400
            }
        ).start();
    }

    render(){

        let { fadeAnim } = this.state;

        const menuOpen = this.props.menuOpen;

        return (
            <Animated.View style={{...this.menuStyles,marginLeft: fadeAnim}} menuOpen={menuOpen}>
                <UserInfo/>
                    <Text>Menu2</Text>
                    <Text>{+menuOpen}</Text>
                    <Text>
                        {this.width}
                    </Text>

            </Animated.View>

        )
    }
}

function mapStateToProps (store) {
    return {
        menuOpen: store.ui.menuOpen
    }
}

export default connect(mapStateToProps)(Menu);