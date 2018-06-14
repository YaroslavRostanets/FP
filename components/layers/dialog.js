/**
 * Created by Yaroslav on 11.06.2018.
 */

import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text, Animated } from 'react-native';
import Ripple from 'react-native-material-ripple';
const Screen = Dimensions.get('window');

export default class Dialog extends Component {

    state = {
        fadeAnim: new Animated.Value(0),
        dialogMarginTop: 0
    };

    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 1,
                duration: 300,
            }
        ).start();
    }

    render() {

        let { fadeAnim } = this.state;

        return (
            <Animated.View style={{...styles.container,opacity: fadeAnim}}>
                <View
                    onLayout={(event) => {
                        if( !this.state.dialogMarginTop ){
                            this.setState({
                                dialogMarginTop: - (event.nativeEvent.layout.height / 2)
                            })
                        }
                        }}
                    style={{ ...styles.modalContent, marginTop: this.state.dialogMarginTop }}>
                    <View style={styles.titleWrap}>
                        <Text style={styles.title}>{this.props.title}</Text>
                    </View>
                    <View style={styles.modalBody}>
                        <Text style={styles.modalBodyText}>
                            {this.props.text}
                        </Text>
                    </View>
                    <View style={styles.modalFooter}>
                        {Array.prototype.map.call(this.props.btnActions,(button, i)=>(
                            <Ripple
                                key={i}
                                rippleColor={'#C9C9C9'}
                                rippleOpacity={0.8}
                                rippleDuration={500}
                                underlayColor={"#5296E7"}
                                onPress={button.action}
                                style={styles.stdBut}>
                                <Text style={styles.btnText}>{button.title}</Text>
                            </Ripple>
                        ))}

                    </View>
                </View>
            </Animated.View>
        );
    }

}

const styles = {
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: 'rgba(0,0,0,0.45)',
        position: 'absolute',
        zIndex: 1099,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    modalContent: {
        width: 300,
        borderRadius: 2,
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [
            { translateX: - 150 }
        ]
    },
    titleWrap: {
        padding: 24,
        minHeight: 16
    },
    title: {
        fontSize: 21,
        fontWeight: '500'
    },
    modalBody: {
        paddingLeft: 24,
        paddingRight: 24
    },
    modalBodyText: {
        color: '#757575',
        fontWeight: '300',
        fontSize: 16
    },
    modalFooter: {
        marginTop: 24,
        paddingTop: 8,
        paddingBottom: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    stdBut: {
        height: 36,
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 12,
        paddingLeft: 12,
        backgroundColor: '#FFFFFF',
        marginRight: 8
    },
    btnText: {
        fontWeight: '500',
        color: '#009688',
        fontSize: 16
    }

};
