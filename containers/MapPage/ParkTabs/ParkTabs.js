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
        this.btnWidthClosed = 58;
    }

    toggleBarState () {
        this.props.toggleBar( !this.props.barOpen );
    }

    redButtonPress () {
        if( !this.props.barOpen ){ //Если бар свернут
            this.props.toggleBar( !this.props.barOpen ); // открываем его
            this.setState({
                showTabs: true
            })
        }
    }

    state = {
        fadeOpacity:  new Animated.Value(1),
        maxHeight: new Animated.Value(355),
        maxWidth:  new Animated.Value( ~~(Dimensions.get('window').width - 20) ),
        btnWidth: new Animated.Value( ~~(Dimensions.get('window').width * 0.9) ),
        showTabs: true
        // "~~" - округляем
    };

    componentWillReceiveProps(nextProps) {
        let Opacity = (nextProps.menuOpen)? 0 : 1;
        let maxHeight = (nextProps.barOpen) ? 355 : 0;
        let maxWidth = (nextProps.barOpen) ? ~~(Dimensions.get('window').width - 20) : this.btnWidthClosed;
        let btnWidth = (nextProps.barOpen) ? this.btnWidth : this.btnWidthClosed;
        let self = this;

        Animated.timing(
            this.state.fadeOpacity,
            {
                toValue: Opacity,
                duration: 300
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
            this.state.maxWidth,
            {
                toValue: maxWidth,
                duration: 400
            }
        ).start(function(){
            if ( !self.props.barOpen ) {
                self.setState({
                    showTabs: false
                });
            }
        });

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
        const maxWidth = this.state.maxWidth;
        const showTabs = this.state.showTabs;

        return (
            <Animated.View
                style={{...styles.parkTabs, opacity: opacity}}>
                <Animated.View style={{...(this.props.barOpen) ? styles.botCont : styles.botContClosed, width: maxWidth}}>
                    <TouchableHighlight style={styles.tabChevron} onPress={this.toggleBarState.bind(this)}>
                        <Icon style={styles.chevronIcon} name="chevron-down"/>
                    </TouchableHighlight>
                    <Animated.View style={{maxHeight: maxHeight}}>
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
                        <View style={{display: (showTabs)? "flex" : "none"}}>
                            <TabSelector />
                        </View>
                    </Animated.View>
                    <Animated.View
                        style={styles.centerBut}>
                        <TouchableHighlight style={styles.touchable} onPress={this.redButtonPress.bind(this)}>
                            {((barOpen) => {
                                switch (barOpen){
                                    case true:
                                        return (<Text style={styles.centerButText}>
                                                    Start(78)
                                                </Text>);
                                    default:
                                        return (
                                            <Icon name="chevron-up" style={styles.chevronUp} />
                                        );
                                }
                            })(this.props.barOpen)}

                        </TouchableHighlight>
                    </Animated.View>
                </Animated.View>
            </Animated.View>
        );

    }
}

const styles = {
    parkTabs: {
        position: "absolute",
        bottom: 15,
        left: 0,
        width: "100%",
        paddingRight: 10,
        paddingLeft: 10,
        zIndex: 9,
        display: "flex",
        overflow: "hidden",
        marginRight: "auto",
        marginLeft: "auto",
        backgroundColor: "red"
    },
    botCont: {
        backgroundColor: 'rgba(243, 246, 248, 0.7)',
        paddingTop: 15,
        paddingRight: 4,
        paddingBottom: 7,
        paddingLeft: 4,
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto"
    },
    botContClosed: {
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        marginLeft: "auto",
        marginRight: "auto"
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
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 0,
        backgroundColor: '#FF6D64',
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        width: "100%"
    },
    circleStyle: {
        height: 58,
        borderRadius: 29,
        backgroundColor: '#FF6D64',
        marginLeft: "auto",
        marginRight: "auto"
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
    touchable: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
    },
    chevronUp: {
        fontSize: 16,
        color: "#FFFFFF"
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

