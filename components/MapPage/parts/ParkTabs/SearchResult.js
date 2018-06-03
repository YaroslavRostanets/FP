/**
 * Created by Yaroslav on 27.05.2018.
 */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as placesActions from '../../../../actions/placesActions';
import { connect } from 'react-redux';
import { View, Text, FlatList, Image, TouchableHighlight, Dimensions, Animated, Easing, Linking } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {timeWithoutMin, distanceConvert} from '../../../../helpers/helpers'

//const CustIcon = createIconSetFromFontello(fontelloConfig);

class SearchResult extends Component {

    constructor(){
        super();
        this.intervalSignWidth = 70;
        this.translateX = new Animated.Value(0);
        this.translateXinvert = new Animated.Value(0);
        this.state = {
            activeItemId: '',
            prevActiveItemId: ''
        };

    }

    componentDidMount(){
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

    openInGMaps(destination) {
        const origin = {
            latitude: this.props.location.lat,
            longitude: this.props.location.lon
        };

        let url = `http://maps.google.com/maps?saddr=${destination.lat},${destination.lon}&daddr=${origin.latitude},${origin.longitude}`;
        openExternalApp(url);

        function openExternalApp(url) {
            Linking.canOpenURL(url).then(supported => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    console.log('Don\'t know how to open URI: ' + url);
                }
            });
        }
    }


    showMarkerOnMap(item) {
        this.props.botBarToBottom(item);
    }

    _keyExtractor = (item, index) => item.id;

    timeIntervalConvert(interval) {
        if(interval >= 60) return interval / 60 + "h";
        else return interval + "m"
    }

    render(){
        const searchPlaces = this.props.places;
        const h = timeWithoutMin;
        const i = this.timeIntervalConvert;
        const d = distanceConvert;
        let activeItemId = this.state.activeItemId;
        let prevActiveItemId = this.state.prevActiveItemId;

        let thumb = (item) => {
            switch (item['kind_of_place']) {
                case 'FREE':
                    return ([
                        <Image key="1" style={styles.sign} resizeMode={'contain'}
                               source={require('../../../../images/thumb1.png' )}
                        />,
                    ]);
                case 'PAY':
                    return ([
                        <Image key="2" style={styles.sign}
                               source={require('../../../../images/thumb2.png' )}
                        />,
                    ]);
                case 'FORBIDDEN':
                    return ([
                        <Image key="3" style={styles.sign}
                               source={require('../../../../images/thumb3.png' )}
                        />,
                    ]);
                case 'FORBIDDEN_YELLOW':
                    return ([
                        <Image key="4" style={styles.sign}
                               source={require('../../../../images/thumb4.png' )}
                        />,
                    ]);
                case 'FORBIDDEN_PAY':
                    return ([
                        <Image key="5" style={styles.sign}
                               source={require('../../../../images/thumb5.png' )}
                        />,
                    ]);
            }};


        return (
            <FlatList style={styles.fastParking}
                      keyExtractor={this._keyExtractor}
                      data={searchPlaces}
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
                                    {thumb(item)}
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
                                    <Icon name="map-o" style={{fontSize: 21}}/>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={this.openInGMaps.bind(this, item)} style={styles.stdBut}>
                                    <Icon name="map-marker" style={{fontSize: 21}}/>
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
        width: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemRow: {
        flexDirection: 'row',
        display: 'flex',
        paddingLeft: 12,
        width: Dimensions.get('window').width + 70,
    },
    imgCont: {
        width: 50,
        height: '100%',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#777879',
        overflow: 'hidden',
        marginRight: 15
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
    sign: {
        width: 50,
        height: 40
    }
};

function mapStateToProps (store) {

    return {
        location: store.location,
        places: store.places.searchResult
    }
}

function mapDispatchToProps(dispatch) {
    return {
        placesActions: bindActionCreators(placesActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchResult)


