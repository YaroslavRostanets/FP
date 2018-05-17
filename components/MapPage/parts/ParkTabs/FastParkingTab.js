/**
 * Created by Yaroslav on 19.09.2017.
 */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as placesActions from '../../../../actions/placesActions';
import { connect } from 'react-redux';
import { View, Text, FlatList, TouchableHighlight, Dimensions, Animated, Easing } from 'react-native';
//import { createIconSetFromFontello } from 'react-native-vector-icons';
//import fontelloConfig from '../../../src/config.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import {timeWithoutMin, distanceConvert} from '../../../../helpers/helpers'

//const CustIcon = createIconSetFromFontello(fontelloConfig);

class FastParking extends Component {

    constructor(){
        super();
        this.intervalSignWidth = 60;
        this.translateX = new Animated.Value(0);
        this.translateXinvert = new Animated.Value(0);
        this.state = {
            activeItemId: '',
            prevActiveItemId: ''
        };

    }

    componentDidMount(){
        console.log('__DID_MOUNT__');
        this.itemRowAnimate();
    }

    itemRowAnimate() {

        Animated.parallel([
            Animated.spring(
            this.translateX,
            {
                toValue: -this.intervalSignWidth,
                duration: 100,
                easing: Easing.linear
            }),
            Animated.spring(
                this.translateXinvert,
                {
                    toValue: 0,
                    duration: 100,
                    //easing: Easing.linear
                }
            )
        ]).start();

    }

    openItemRow (id) {
            this.translateX.setValue(0);
            this.translateXinvert.setValue(-this.intervalSignWidth);
            if( id !== this.state.activeItemId ){
                this.setState({
                    prevActiveItemId: this.state.activeItemId,
                    activeItemId: id
                },() => {
                    this.itemRowAnimate();
                });
            } else {
                this.setState({
                    activeItemId: '',
                    prevActiveItemId: id
                },() => {
                    this.itemRowAnimate();
                });
            }
    };

    showMarkerOnMap(item) {
        this.props.botBarToBottom(item);
    }

    _keyExtractor = (item, index) => item.id;

    timeIntervalConvert(interval) {
        if(interval >= 60) return interval / 60 + "h";
        else return interval + "m"
    }

    render(){
        const fastPlaces = this.props.places;
        const h = timeWithoutMin;
        const i = this.timeIntervalConvert;
        const d = distanceConvert;
        let activeItemId = this.state.activeItemId;
        let prevActiveItemId = this.state.prevActiveItemId;

        return (
            <FlatList style={styles.fastParking}
                keyExtractor={this._keyExtractor}
                data={fastPlaces}
                extraData={this.state.activeItemId}
                ref='flatlist'
                renderItem={({item}) => (
                    <Animated.View
                        style={{...styles.itemRow,
                        transform: [{translateX: (prevActiveItemId == item.id) ? this.translateXinvert : 0 || (activeItemId == item.id) ? this.translateX : 0 }]
                        }}
                        useNativeDriver={true}
                        id={item.id}>
                        <TouchableHighlight onPress={this.openItemRow.bind(this, item.id)}>
                            <View style={styles.oneRow}>
                                <View style={styles.imgCont}>
                                    <Icon style={styles.timer} name="circle-thin"/>
                                    <Text style={styles.icoTime}>{i( item['time_interval'] )}</Text>
                                </View>
                                <View style={styles.content}>
                                    <Text style={styles.distance}>
                                        {d(item.geodist_pt)}
                                    </Text>
                                    <View style={styles.time}>
                                        <Text style={styles.onDays}>{h(item['weekday_from'])}-{h(item['weekday_to'])}</Text>
                                        <Text style={styles.onDays}>({h(item['saturday_from'])}-{h(item['saturday_to'])})</Text>
                                        <Text style={styles.onSunday}>{h(item['sunday_from'])}-{h(item['sunday_to'])}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableHighlight>
                        <View style={styles.btnWrap}>
                            <TouchableHighlight onPress={this.showMarkerOnMap.bind(this, item)} style={styles.stdBut}>
                                    <Icon name="map-o" style={{fontSize: 23}}/>
                            </TouchableHighlight>
                        </View>
                    </Animated.View>

                )}
            />
        )
    }

}

const styles = {
    fastParking: {
        // paddingLeft: 12,
        // paddingRight: 12,
        height: 250
    },
    oneRow: {
        display: 'flex',
        flexDirection: 'row',
        height: 62.5,
        width: Dimensions.get('window').width - 35,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 5,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
        flexGrow: 1,
        marginRight: 12
        //backgroundColor: '#DFDFDF'
    },
    btnWrap: {
        flexDirection: 'row',
        backgroundColor: '#DFDFDF',
        width: 55,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemRow: {
        flexDirection: 'row',
        display: 'flex',
        paddingLeft: 12,
        width: Dimensions.get('window').width + 50,
    },
    imgCont: {
        width: 50,
        height: '100%'
    },
    icoTime: {
        color: '#5093DF',
        position: 'absolute',
        left: 0,
        top: 13,
        fontSize: 15,
        textAlign: 'center',
        width: 43,
        //backgroundColor: '#18A15F' служебный стиль
    },
    content: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    timer: {
        fontSize: 50
    },
    time: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    onDays: {
        color: '#6F7071',
        fontSize: 16,
        paddingRight: 7,
        marginRight: 7,
        borderRightColor: '#B6B6B6',
        borderRightWidth: 1,
    },
    onSunday: {
        fontSize: 16,
        color: '#FB0007'
    },
    stdBut: {
        height: 50,
        width: 40,
        borderRadius: 3,
        backgroundColor: '#F2F5F7',
        borderWidth: 1,
        borderColor: '#D3DFE1',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
};

function mapStateToProps (store) {

    return {
        location: store.location,
        places: store.places.fastParkingPlaces
    }
}

function mapDispatchToProps(dispatch) {
    return {
        placesActions: bindActionCreators(placesActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FastParking)

