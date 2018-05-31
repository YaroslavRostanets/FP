/**
 * Created by Yaroslav on 31.05.2018.
 */

import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {timeWithoutMin} from '../../../../helpers/helpers';
import store from '../../../../store/configureStore';
import * as locationActions from '../../../../actions/locationActions'
import Icon from 'react-native-vector-icons/FontAwesome';



class RouteMarkerDetail extends Component {

    render() {

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

        const marker = this.props.routeMarker;
        const h = timeWithoutMin;

        return (
            <View style={styles.routeMarker}>
                <View style={styles.signWrap}>
                    {thumb(marker)}
                    <Text style={styles.signText}>{h(marker['weekday_from'])}-{h(marker['weekday_to'])}</Text>
                    <Text style={styles.signText}>({h(marker['saturday_from'])}-{h(marker['saturday_to'])})</Text>
                    <Text style={styles.signText}>{h(marker['sunday_from'])}-{h(marker['sunday_to'])}</Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.contentIn}></View>
                    <View style={styles.controls}>
                        <Ripple
                            rippleColor={'#FFFFFF'}
                            rippleOpacity={0.6}
                            rippleDuration={800}
                            underlayColor={"#5296E7"}
                            style={{...styles.closeRoute, backgroundColor: '#159F5C'}}>
                            <Icon name="times" style={styles.ico} />
                            <Text style={styles.iconText}>OPEN IN GOOGLE MAPS</Text>
                        </Ripple>
                        <Ripple
                            rippleColor={'#FFFFFF'}
                            rippleOpacity={0.6}
                            rippleDuration={800}
                            underlayColor={"#5296E7"}
                            style={styles.closeRoute}>
                            <Icon name="times" style={styles.ico} />
                            <Text style={styles.iconText}>CLOSE ROUTE</Text>
                        </Ripple>
                    </View>
                </View>
            </View>
        );
    }


}

const styles = {
    routeMarker: {
        height: 350,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row'
    },
    signWrap: {
        backgroundColor: '#4D8CF5',
        height: 100,
        paddingLeft: 10,
        paddingRight: 10
    },
    content: {
        flexGrow: 1,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap'
    },
    sign: {
        width: 50,
        height: 50
    },
    signText: {
        fontSize: 10,
        color: '#6F7071'
    },
    contentIn: {
        flexGrow: 1,
        flex: 1,
        height: 100
    },
    closeRoute: {
        backgroundColor: '#F5391E',
        width: 60,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ico: {
        color: '#FFFFFF',
        fontSize: 32
    },
    iconText: {
        color: '#FFFFFF',
    },
    controls: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap'
    }
};

function mapStateToProps (store) {
    return {
        location: store.location
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteMarkerDetail);

