/**
 * Created by Yaroslav on 09.09.2017.
 */
import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as uiActions from '../../../../actions/uiActions';
import * as placesActions from '../../../../actions/placesActions';
import {FAST_PARKING, FILTER, SEARCH, SEARCH_RESULT} from '../../../../constants/UI';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../../../src/config.json';


const CustIcon = createIconSetFromFontello(fontelloConfig);

class TabSelector extends Component {

    setActiveTab(activeTab){
        this.props.hideCalloutView();
        if( activeTab === FAST_PARKING ){
            this.props.placesActions.showFastPlacesOnMap(this.props.places);
        }
        this.props.uiActions.toggleTab(activeTab);
    }

    render(){

        return(
            <View style={styles.tabSel}>
                <TouchableHighlight onPress={this.setActiveTab.bind(this,FAST_PARKING)}
                                    style={(this.props.activeTab == FAST_PARKING)?{...styles.oneTabBut,...styles.activeTab}:styles.oneTabBut}>
                    <View style={styles.align}>
                        <CustIcon name="rocket" style={(this.props.activeTab == FAST_PARKING)?{...styles.tabIcon,...styles.activeText}:styles.tabIcon}/>
                        <Text style={(this.props.activeTab == FAST_PARKING)?{...styles.tabDescr,...styles.activeText}:styles.tabDescr}>
                            Fast parking
                        </Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.setActiveTab.bind(this,FILTER)}
                                    style={(this.props.activeTab == FILTER)?{...styles.oneTabBut,...styles.activeTab}:styles.oneTabBut}>
                    <View style={styles.align}>
                        <CustIcon name="filter" style={(this.props.activeTab == FILTER)?{...styles.tabIcon,...styles.activeText}:styles.tabIcon}/>
                        <Text style={(this.props.activeTab == FILTER)?{...styles.tabDescr,...styles.activeText}:styles.tabDescr}>Filter</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.setActiveTab.bind(this,SEARCH)}
                                    style={(this.props.activeTab == SEARCH_RESULT || this.props.activeTab == SEARCH)?{...styles.oneTabBut,...styles.activeTab}:styles.oneTabBut}>
                    <View style={styles.align}>
                        <CustIcon name="loupe" style={(this.props.activeTab == SEARCH
                        || this.props.activeTab == SEARCH_RESULT)?{...styles.tabIcon,...styles.activeText}:styles.tabIcon}/>
                        <Text style={(this.props.activeTab == SEARCH
                        || this.props.activeTab == SEARCH_RESULT)?{...styles.tabDescr,...styles.activeText}:styles.tabDescr}>Search</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = {
    tabSel: {
        display: "flex",
        justifyContent: 'space-between',
        flexDirection: "row"
    },
    oneTabBut: {
        backgroundColor: '#FFFFFF',
        width: '32%',
        height: 105,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#EDEDED',
        position: 'relative'
    },
    align: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabDescr: {
        fontSize: 16,
        color: '#6F7071'
    },
    tabIcon: {
        fontSize: 40,
        marginBottom: 5
    },
    activeText: {
        color: '#5093DF'
    },
    activeTab: {
        borderTopColor: '#FFFFFF'
    }
};

function mapStateToProps (store) {
    return {
        activeTab: store.ui.activeTab,
        places: store.places.fastParkingPlaces
    }
}

function mapDispatchToProps(dispatch) {
    return {
        uiActions: bindActionCreators(uiActions, dispatch),
        placesActions: bindActionCreators(placesActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabSelector);