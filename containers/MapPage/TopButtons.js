/**
 * Created by Yaroslav on 26.08.2017.
 */
import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import store from '../../store/configureStore'
import * as uiActions from '../../actions/uiActions'

class TopButtons extends Component {

    toggleMenu(){
        this.props.uiActions.toggleMenu(!this.props.menuOpen);
    }

    render() {
        const menuOpen = this.props.menuOpen;

        return (
            <View style={styles.topButtons} menuOpen={menuOpen}>
                <TouchableHighlight onPress={this.toggleMenu.bind(this)} style={styles.stdBut}>
                    <Text>
                        true
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.stdBut}>
                    <Text>
                        false
                    </Text>
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
        paddingRight: "5%",
        paddingLeft: "5%",
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
        borderColor: '#D3DFE1'
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
