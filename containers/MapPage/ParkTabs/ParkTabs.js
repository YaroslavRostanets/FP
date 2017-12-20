/**
 * Created by Yaroslav on 08.09.2017.
 */
import React, { Component } from 'react';
import { View, FlatList, Text, TouchableHighlight, Animated, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import {FAST_PARKING, FILTER, SEARCH} from '../../../constants/UI';
import {toggleBar} from '../../../actions/uiActions';
import Icon from 'react-native-vector-icons/FontAwesome';
import TabSelector from '../../../containers/MapPage/ParkTabs/TabSelector';
import  FastParking from './FastParkingTab';
import  FilterTab from './FilterTab';
import SearchTab from './SearchTab';

class ParkTabs extends Component {

    constructor(props){
        super(props);
        this.screenWidth = Dimensions.get('window').width;
        this.btnWidth = ~~( this.screenWidth * 0.85 );
        this.btnWidthClosed = 57;
        console.log("width",this.btnWidth);
    }

    toggleBarState () {
        this.props.toggleBar( !this.props.barOpen );
    }

    state = {
        fadeOpacity:  new Animated.Value(1),
        maxHeight: new Animated.Value(355),
        btnWidth: new Animated.Value( ~~(Dimensions.get('window').width * 0.85) )
        // "~~" - округляем
    };

    componentWillReceiveProps(nextProps) {
        let Opacity = (nextProps.menuOpen)? 0 : 1;
        let maxHeight = (nextProps.barOpen) ? 355 : 0;
        let btnWidth = (nextProps.barOpen) ? this.btnWidth : this.btnWidthClosed;

        Animated.timing(
            this.state.fadeOpacity,
            {
                toValue: Opacity,
                duration: 400
            }
        ).start();

        Animated.timing(
            this.state.maxHeight,
            {
                toValue: maxHeight,
                duration: 400
            }
        ).start();

        Animated.timing(
            this.state.btnWidth,
            {
                toValue: btnWidth,
                duration: 400
            }
        ).start();

    }

    render() {
        const activeTab = this.props.activeTab;
        const opacity = this.state.fadeOpacity;
        const maxHeight = this.state.maxHeight;
        const barOpen = this.state.barOpen;

        return (
            <Animated.View style={{...styles.parkTabs, opacity: opacity}}>
                <View style={styles.botCont}>
                    <TouchableHighlight style={styles.tabChevron} onPress={this.toggleBarState.bind(this)}>
                        <Icon style={styles.chevronIcon} name="chevron-down"/>
                    </TouchableHighlight>
                    <Animated.View style={{...styles.wrapClosed, maxHeight: maxHeight}}>
                        <View style={ styles.tabCont }>
                            {((activeTab)=>{
                                switch(activeTab) {
                                    case FAST_PARKING:
                                        return (<FastParking />);
                                    case FILTER:
                                        return (<FilterTab/>);
                                    case SEARCH:
                                        return (<SearchTab/>);
                                    default:
                                        return (<FastParking />);
                                }
                            })(activeTab)}
                        </View>
                        <TabSelector />
                    </Animated.View>
                    <Animated.View style={(this.props.barOpen)? {...styles.centerBut,width: this.state.btnWidth} : {...styles.circleStyle, width: this.state.btnWidth} }>
                        <TouchableHighlight style={styles.touchable}>
                            <Text style={styles.centerButText}>
                                Start(78)
                            </Text>
                        </TouchableHighlight>
                    </Animated.View>
                </View>
            </Animated.View>
        );

    }
}

const styles = {
    parkTabs: {
        position: "absolute",
        bottom: 15,
        width: "100%",
        paddingRight: "3.5%",
        paddingLeft: "3.5%",
        zIndex: 9,
        display: "flex",

    },
    botCont: {
        backgroundColor: 'rgba(243, 246, 248, 0.7)',
        paddingTop: 15,
        paddingRight: 4,
        paddingBottom: 7,
        paddingLeft: 4,
        width: '100%'
    },
    tabCont: {
        borderStyle: 'solid',
        borderColor: '#EDEDED',
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 3,
        marginBottom: -1
    },
    parkList: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#EDEDED',
        position: 'relative'
    },
    centerBut: {
        height: 48,
        marginTop: 7,
        width: this.btnWidth,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 0,
        backgroundColor: '#FF6D64',
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1
    },
    circleStyle: {
        height: 58,
        borderRadius: 29,
        backgroundColor: '#FF6D64'
    },
    centerButText: {
        fontSize: 16,
        color: '#FFFFFF'
    },
    tabChevron: {
        position: "absolute",
        left: "50%",
        top: -1,
        height: 16,
        width: 16,
        marginLeft: -8
    },
    chevronIcon: {
        color: "#FE6D64",
        fontSize: 16
    },
    wrapClosed: {
        maxHeight: 0,
        overflow: "hidden"
    },
    touchable: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }


};

function mapStateToProps (store) {
    return {
        activeTab: store.ui.activeTab,
        menuOpen: store.ui.menuOpen,
        barOpen: store.ui.barOpen
    }
}

function mapDispatchToProps (dispatch) {
    return {
        toggleBar: bindActionCreators(toggleBar, dispatch)
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(ParkTabs)

