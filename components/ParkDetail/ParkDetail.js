/**
 * Created by Yaroslav on 25.08.2017.
 */
import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {timeWithoutMin, timeIntervalConvert} from '../../helpers/helpers';

import { connect } from 'react-redux';

const Screen = Dimensions.get('window');

class ParkDetail extends Component {

    backToMapPage(navigator) {
        navigator.pop();
    }


    render() {

        const place = this.props.place;
        const h = timeWithoutMin;
        const dayIndex = new Date().getDate();

        let parkTimeToDay = (dayIndex) => {
            console.log('__dayIndex__', dayIndex);
            switch(dayIndex) {
                case '0':
                    return `${h(place['sunday_from'])}-${h(place['sunday_to'])}`;
                case '6':
                    return `${h(place['saturday_from'])}-${h(place['saturday_to'])}`;
                default:
                    return `${h(place['weekday_from'])}-${h(place['weekday_to'])}`;
            }
        };

        let thumb = () => {
            switch (place['kind_of_place']) {
            case 'FREE':
                return ([
                    <Image key="1" style={styles.sign}
                           source={require('../../images/thumb1.png' )}
                    />,
                ]);
            case 'PAY':
                return ([
                    <Image key="2" style={styles.sign}
                           source={require('../../images/thumb2.png' )}
                    />,
                ]);
            case 'FORBIDDEN':
                return ([
                    <Image key="3" style={styles.sign}
                           source={require('../../images/thumb3.png' )}
                    />,
                ]);
            case 'FORBIDDEN_YELLOW':
                return ([
                    <Image key="4" style={styles.sign}
                           source={require('../../images/thumb4.png' )}
                    />,
                ]);
            case 'FORBIDDEN_PAY':
                return ([
                    <Image key="5" style={styles.sign}
                           source={require('../../images/thumb5.png' )}
                    />,
                ]);
        }};

        return (
            <View style={styles.screen}>
                <View style={{flex: 0.85}}>
                    <View style={styles.topBtns}>
                        <View style={styles.col}>
                            {thumb()}
                        </View>
                        <View style={styles.col}>
                            <Icon name="circle-thin" style={styles.ico} />
                            <Text style={styles.interval}>
                                2h
                            </Text>
                        </View>
                        <View style={styles.col}>
                            <Icon name="circle-thin" style={styles.ico} />
                            <Text style={styles.time}>
                                {parkTimeToDay(dayIndex)}
                            </Text>
                        </View>
                        <View style={styles.col}>
                            <TouchableHighlight onPress={this.backToMapPage.bind(this, this.props.navigator)} style={styles.back}>
                                <Icon name="reply" style={styles.btnIco} />
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={styles.parkInfo}>
                        <View style={{...styles.col2, padding: 10}}>
                            <View style={styles.imgCont}>
                                <Image style={{width: Screen.width * 0.40, height: 185}} resizeMode={'contain'}
                                       source={{uri: place['photo_url']}}
                                />
                            </View>
                        </View>
                        <View style={styles.col2}>
                            <View style={{...styles.row,...styles.border}}>
                                <Text style={styles.label}>Time limit:</Text>
                                <Text style={styles.cont}>{timeIntervalConvert(place['time_interval'])}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Mon-Fri:</Text>
                                <Text style={styles.cont}>{h(place['weekday_from'])}-{h(place['weekday_to'])}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Sat:</Text>
                                <Text style={styles.cont}>({h(place['saturday_from'])}-{h(place['saturday_to'])})</Text>
                            </View>
                            <View style={{...styles.row,...styles.border}}>
                                <Text style={styles.label}>Sun:</Text>
                                <Text style={{...styles.cont,color: '#FF0000'}}>{h(place['sunday_from'])}-{h(place['sunday_to'])}</Text>
                            </View>
                            <View style={{...styles.row, paddingTop: 10}}>
                                <Text style={styles.label}>Zone:</Text>
                                <Text style={styles.zone}>out of zone</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.botBtn}>
                    <TouchableHighlight style={styles.stdBut}>
                        <Icon name="file-image-o" style={styles.icon} />
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.stdButRed}>
                        <Icon name="car" style={{...styles.icon, color: '#FFFFFF'}} />
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.stdBut}>
                        <Icon name="star-o" style={styles.icon} />
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}



const styles = {
    screen: {
        padding: 10,
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    time: {
        fontSize: 20,
        color: '#5093DF',
        position: 'absolute'
    },
    interval: {
        fontSize: 28,
        color: '#5093DF',
        position: 'absolute',
        left: 0,
        top: '50%',
        width: '100%',
        textAlign: 'center',
        transform: [
            { translateY: -20}
        ],
    },
    topBtns: {
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderColor: '#D8D8D8',
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    col: {
        width: '25%',
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    sign: {
        width: 70,
        height: 70,
        borderWidth: 1,
        borderColor: '#818283',
        borderRadius: 4
    },
    ico: {
        fontSize: 78
    },
    btnIco: {
        fontSize: 20
    },
    back: {
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
    parkInfo: {
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderColor: '#D3DFE1',
        display: 'flex',
        flexDirection: 'row'
    },
    col2: {
        width: '45%',
        flexGrow: 1
    },
    label: {
        fontSize: 16,
        color: '#6F7071',
        width: '45%',
        textAlign: 'right'
    },
    cont: {
        fontSize: 24,
        color: '#6F7071',
        textAlign: 'center',
        width: '55%',
        position: 'relative',
        top: 4
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    border: {
        paddingBottom: 10,
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1
    },
    zone: {
        fontWeight: 'bold',
        fontSize: 14,
        width: '50%',
        textAlign: 'center'
    },
    imgCont: {
        width: '100%',
        height: 190,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    imgPlace: {
        maxHeight: '100%',
        height: '100%'
    },
    botBtn: {
        backgroundColor: '#FFFFFF',
        left: 0,
        bottom: 0,
        flex: 0.15,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
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
        justifyContent: "center",
    },
    stdButRed: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: '#FF6D64',
        borderWidth: 1,
        borderColor: '#D3DFE1',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        fontSize: 20
    }
};

function mapStateToProps (store) {

    return {
        place: store.places.placeDetail,
    }
}

export default connect(mapStateToProps)(ParkDetail)