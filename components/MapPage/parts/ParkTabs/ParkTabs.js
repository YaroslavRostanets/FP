/**
 * Created by Yaroslav on 08.09.2017.
 */
import React, { Component } from 'react';
import { View, FlatList, Text, TouchableHighlight, Animated, Dimensions, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import {FAST_PARKING, FILTER, SEARCH, SEARCH_RESULT} from '../../../../constants/UI';
import {toggleTab} from '../../../../actions/uiActions';
import * as placesActions from '../../../../actions/placesActions';
import Icon from 'react-native-vector-icons/FontAwesome';
import TabSelector from './TabSelector';
import  FastParking from './FastParkingTab';
import  FilterTab from './FilterTab';
import SearchTab from './SearchTab';
import SearchResult from './SearchResult';
import Ripple from 'react-native-material-ripple';

const Screen = Dimensions.get('window');

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


        Animated.timing(
            this.state.tabsOpacity,
            {
                toValue: tabsOpacity,
                duration: 300
            }
        ).start();

    }

    async filterHeandler(){
        let lat = this.props.location.lat;
        let lon = this.props.location.lon;
        await AsyncStorage.multiGet(['MONFRY', 'SAT', 'SUN', 'filterFrom', 'filterTo', 'filterTimeFrom', 'filterTimeTo'], (err, filterItems)=>{
            let filterObject = {};
            filterItems.forEach((item) => {
                if( item[1] != null ){
                    filterObject[item[0]] = item[1]
                }
            });

            console.log('filter_:', filterObject);

            this.props.placesActions.getPlacesByFilter(filterObject, lat, lon, this.props.hideBotBar);

        });
    }

    refreshFastParking(){
        console.log('_refresh_fast_parking_');
    }

    searchHeandler() {
        let lat = this.props.location.lat;
        let lon = this.props.location.lon;
        let searchOptionsObject = this.props.searchFilter;

        this.props.placesActions.getPlacesSearch(searchOptionsObject, lat, lon, this.props.toggleTab.bind(this));
    }

    redButtonHeandler() {
        switch(this.props.activeTab) {
            case FAST_PARKING:
                this.refreshFastParking();
                break;
            case FILTER:
                this.filterHeandler();
                break;
            case SEARCH:
                this.searchHeandler();
                break;
            default:
                break;
        }
    }

    render() {
        const activeTab = this.props.activeTab;
        const showTabs = this.state.showTabs;
        const botBarToBottom = this.props.botBarToBottom;

        return (

                <Animated.View style={styles.botCont}>
                    <View style={styles.line}></View>
                    {/*<Icon style={styles.chevronIcon} name="chevron-down"/>*/}
                    <View>
                        <View style={ styles.tabCont }>
                            {((activeTab)=>{
                                switch(activeTab) {
                                    case FAST_PARKING:
                                        return (<FastParking botBarToBottom={botBarToBottom} />);
                                    case FILTER:
                                        return (<FilterTab/>);
                                    case SEARCH:
                                        return (<SearchTab/>);
                                    case SEARCH_RESULT:
                                        return (<SearchResult/>);
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
                        <Ripple
                            rippleColor={'#FFFFFF'}
                            rippleOpacity={0.6}
                            rippleDuration={800}
                            onPress={this.redButtonHeandler.bind(this)}
                            style={styles.touchable}>
                            {((activeTab)=>{
                                switch(activeTab) {
                                    case FAST_PARKING:
                                        return (<View style={styles.centerButIn}>
                                                    <Icon style={styles.redBtnIcon} name={'refresh'} />
                                                        <Text style={styles.centerButText}>
                                                            Refresh
                                                        </Text>
                                                </View>
                                            );
                                    case FILTER:
                                        return (<View style={styles.centerButIn}>
                                                    <Icon style={styles.redBtnIcon} name={'check-square-o'} />
                                                    <Text style={styles.centerButText}>
                                                        Apply Filter
                                                    </Text>
                                                </View>);
                                    case SEARCH:
                                        return (<View style={styles.centerButIn}>
                                                    <Icon style={styles.redBtnIcon} name={'search'} />
                                                    <Text style={styles.centerButText}>
                                                        Search
                                                    </Text>
                                                </View>);
                                    case SEARCH_RESULT:
                                        return (<View style={styles.centerButIn}>
                                            <Icon style={styles.redBtnIcon} name={'search'} />
                                            <Text style={styles.centerButText}>
                                                New Search
                                            </Text>
                                        </View>);
                                    default:
                                        return (<Text style={styles.centerButText}>
                                            Start(78)
                                        </Text>);
                                }
                            })(activeTab)}
                        </Ripple>
                    </View>
                </Animated.View>

        );

    }
}

const styles = {
    botCont: {
        backgroundColor: 'rgba(243, 246, 248, 0.7)',
        paddingTop: 30,
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
    centerButIn: {
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
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
        left: "50%"
    },
    line: {
        height: 3,
        width: 80,
        marginLeft: -40,
        position: 'absolute',
        left: '50%',
        backgroundColor: '#777879',
        borderRadius: 2,
        top: 15
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
    },
    redBtnIcon: {
        fontSize: 18,
        marginRight: 5,
        display: 'flex',
        color: '#FFFFFF'
    }


};

function mapStateToProps (store) {
    return {
        location: store.location,
        activeTab: store.ui.activeTab,
        searchFilter: store.places.searchFilter
    }
}

function mapDispatchToProps (dispatch) {
    return {
        toggleTab: bindActionCreators(toggleTab, dispatch),
        placesActions: bindActionCreators(placesActions, dispatch)
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(ParkTabs)

