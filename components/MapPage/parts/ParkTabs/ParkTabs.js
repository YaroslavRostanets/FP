/**
 * Created by Yaroslav on 08.09.2017.
 */
import React, { Component } from 'react';
import { View, FlatList, Text, TouchableHighlight, Animated, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import {FAST_PARKING, FILTER, SEARCH} from '../../../../constants/UI';
import {toggleBar} from '../../../../actions/uiActions';
import Icon from 'react-native-vector-icons/FontAwesome';
import TabSelector from './TabSelector';
import  FastParking from './FastParkingTab';
import  FilterTab from './FilterTab';
import SearchTab from './SearchTab';
import Interactable from 'react-native-interactable';

class ParkTabs extends Component {

    constructor(props){
        super(props);
    }

    state = {
        height: 425,
        fadeOpacity:  new Animated.Value(1),
        tabsOpacity: new Animated.Value( 1 ),
        showTabs: true
    };

    componentWillReceiveProps(nextProps) {
        let tabsOpacity = (nextProps.barOpen)? 1 : 0;
        let self = this;


        Animated.timing(
            this.state.tabsOpacity,
            {
                toValue: tabsOpacity,
                duration: 300
            }
        ).start();
    }

    heightFix(event) {
        console.log('nativeEvent: ', event.nativeEvent);
        getHeight = index => {
            console.log('this.index', index);
            switch (Number(index)){
                case 0:
                    return 425;
                case 1:
                    return 165;
                case 2:
                    return 0;
            }
        };
        //this.setState({height: getHeight(event.nativeEvent.index)});
        console.log('height: ', this.state.height);
    }

    render() {
        const activeTab = this.props.activeTab;
        const showTabs = this.state.showTabs;
        const height = this.state.height;

        return (
            <View style={{display: "flex",width: "100%", alignItems: "flex-end", height: this.state.height, backgroundColor: "blue"}}>
                <Interactable.View
                    verticalOnly={true}
                    snapPoints={[{y: 0}, {y: 165}, {y: 425}]}
                    onSnap={this.heightFix.bind(this)}
                    boundaries={{top: -300}}
                    initialPosition={{y: 0}}
                    style={styles.parkTabs}>
                    <Animated.View style={styles.botCont}>
                        <Icon style={styles.chevronIcon} name="chevron-down"/>
                        <View>
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
                        </View>
                        <View
                            style={styles.centerBut}>
                            <TouchableHighlight style={styles.touchable}>
                                <Text style={styles.centerButText}>
                                    Start(78)
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </Animated.View>
                </Interactable.View>
            </View>
        );

    }
}

const styles = {
    parkTabs: {
        // position: "absolute",
        //bottom: 0,
        //height: 425,
        // left: 0,
        backgroundColor: 'rgba(243, 246, 248, 0.7)',
        width: "100%",
        // paddingRight: 10,
        // paddingLeft: 10,
        // zIndex: 9,
        // display: "flex",
        // overflow: "hidden",
        // marginRight: "auto",
        // marginLeft: "auto",
        //backgroundColor: "red"
    },
    botCont: {
        backgroundColor: 'rgba(243, 246, 248, 0.7)',
        paddingTop: 20,
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
        fontSize: 17,
        position: "absolute",
        left: "50%",

    },
    touchable: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderRadius: 4
    },
    chevronUp: {
        fontSize: 16,
        color: "#FFFFFF"
    }


};

function mapStateToProps (store) {
    return {
        activeTab: store.ui.activeTab,
        //menuOpen: store.ui.menuOpen,
        barOpen: store.ui.barOpen
    }
}

function mapDispatchToProps (dispatch) {
    return {
        toggleBar: bindActionCreators(toggleBar, dispatch)
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(ParkTabs)

