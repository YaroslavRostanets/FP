/**
 * Created by Yaroslav on 26.08.2017.
 */
import React, { Component } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import store from '../../../store/configureStore'
import * as uiActions from '../../../actions/uiActions'
import Icon from 'react-native-vector-icons/FontAwesome';

class TopButtons extends Component {

    toggleMenu(){
        let isMenuOpen = this.props.menuOpen;
        if(isMenuOpen){
            this.props.toggleMenu.closeMenu();
            this.props.uiActions.toggleMenu(!this.props.menuOpen);
        } else {
            this.props.toggleMenu.openMenu();
            this.props.uiActions.toggleMenu(!this.props.menuOpen);
        }
        //this.props.uiActions.toggleMenu(!this.props.menuOpen);
    }

    btnAnimation(){

    }

    render() {
        const menuOpen = this.props.menuOpen;

        return (
            <View style={styles.topButtons} menuOpen={menuOpen}>
                <TouchableHighlight underlayColor={"#5296E7"}
                                    onShowUnderlay={this.btnAnimation.bind(this)}
                                    onPress={this.toggleMenu.bind(this)} style={styles.stdBut}>
                    <Icon name="reorder" style={styles.ico} />
                </TouchableHighlight>

                <TouchableHighlight style={styles.stdBut}>
                    <Icon name="map-marker" style={styles.ico} />
                </TouchableHighlight>
            </View>
        );

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
        menuOpen: store.ui.menuOpen
    }
}

function mapDispatchToProps(dispatch) {
    return {
        uiActions: bindActionCreators(uiActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopButtons);
