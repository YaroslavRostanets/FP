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



class MenuBtn extends Component {

    toggleMenu(){
        if(this.props.menuOpen){
            this.props.toggleMenu.closeMenu();
        } else {
            this.props.toggleMenu.openMenu();
        }
    }


    render() {

        return (
            <Ripple
                rippleColor={'#FFFFFF'}
                rippleOpacity={0.6}
                rippleDuration={800}
                underlayColor={"#5296E7"}
                onPress={this.toggleMenu.bind(this)} style={styles.stdBut}>
                <Icon name="reorder" style={styles.ico} />
            </Ripple>
        );
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
        left: 13
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuBtn);
