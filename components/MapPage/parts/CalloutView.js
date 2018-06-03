/**
 * Created by Yaroslav on 25.04.2018.
 */

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {timeIntervalConvert,timeWithoutMin, distanceConvert} from '../../../helpers/helpers'

class CalloutView extends Component {

    goToDetail(marker, navigator){
        let lat = this.props.location.lat;
        let lon = this.props.location.lon;

        this.props.getPlaceById(marker['id'], navigator, lat, lon);
    }

    getDirection(marker){
        this.props.hideCalloutView();
        this.props.getDirection(marker, this.props.setNewLocation);
    }

    render (){
        const marker = this.props.marker;
        const h = timeWithoutMin;
        const interval = marker['time_interval'];
        const navigator = this.props.navigator;

        let thumb = () => {switch (marker['kind_of_place']) {
            case 'FREE':
                return ([
                    <Image key="1" style={styles.parkSignImg}
                           source={require('../../../images/thumb1.png' )}
                    />,
                ]);
            case 'PAY':
                return ([
                    <Image key="2" style={styles.parkSignImg}
                           source={require('../../../images/thumb2.png' )}
                    />,
                ]);
            case 'FORBIDDEN':
                return ([
                    <Image key="3" style={styles.parkSignImg}
                           source={require('../../../images/thumb3.png' )}
                    />,
                ]);
            case 'FORBIDDEN_YELLOW':
                return ([
                    <Image key="4" style={styles.parkSignImg}
                           source={require('../../../images/thumb4.png' )}
                    />,
                ]);
            case 'FORBIDDEN_PAY':
                return ([
                    <Image key="5" style={styles.parkSignImg}
                           source={require('../../../images/thumb5.png' )}
                    />,
                ]);
            }

        };

        return(
            <View style={styles.container}>
                <View style={styles.topInfo}>
                    <View style={styles.parkSign}>
                        {thumb()}
                        <Text style={styles.text}>{timeIntervalConvert(interval)}</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>{h(marker['weekday_from'])}-{h(marker['weekday_to'])}</Text>
                        <Text style={styles.text}>({h(marker['saturday_from'])}-{h(marker['saturday_to'])})</Text>
                        <Text style={{...styles.text,color: '#FF0000'}}>{h(marker['sunday_from'])}-{h(marker['sunday_to'])}</Text>
                    </View>
                </View>
                <View style={styles.rowBtns}>
                    <TouchableHighlight onPress={this.goToDetail.bind(this, marker, navigator)} style={styles.stdBut}>
                        <Icon name="info" style={styles.ico} />
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.stdBut}>
                        <Icon name="star-o" style={styles.ico} />
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={this.getDirection.bind(this, marker)}
                        style={styles.routeMapBtn}>
                        <View style={styles.routeMapBtnIn}>
                            <Icon name="car" style={{...styles.ico,...styles.icoRoute}} />
                            <Text>
                                {distanceConvert(marker['geodist_pt'])}
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const styles = {
    container: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#FFFFFF',
        width: 140,
        padding: 5,
        zIndex: 1009,
        borderRadius: 4,
        overflow: 'visible',
        borderWidth: 1,
        borderColor: '#EDEDED'
    },
    interval: {

    },
    topInfo: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1
    },
    parkSign: {
        width: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    parkSignImg: {
        width: 50,
        height: 50,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#6C6D6E',
        overflow: 'hidden'
    },
    parkTime: {
        width: '50%'
    },
    text: {
        color: '#6F7071',
        fontSize: 16,
        textAlign: 'center'
    },
    rowBtns: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    routeMapBtn: {
        height: 30,
        borderRadius: 15,
        backgroundColor: '#F2F5F7',
        borderWidth: 1,
        borderColor: '#D3DFE1',
        display: "flex",
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    routeMapBtnIn: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
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
        marginBottom: 10
    },
    ico: {
        color: "#6F7071",
        fontSize: 26
    },
    icoRoute: {
        fontSize: 22,
        marginRight: 5
    },
    botArrow: {
        position: 'absolute',
        bottom: -15,
        left: '50%',
        width: 26,
        marginLeft: -13,
        height: 30,
        backgroundColor: '#FFFFFF'
    }
};

export default CalloutView
