/**
 * Created by Yaroslav on 04.05.2018.
 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as uiActions from '../../actions/uiActions';
import { StyleSheet, View, Image, Text, Button, Dimensions, TouchableHighlight, AsyncStorage, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

/*--Переводы--*/
import {translator} from '../../helpers/helpers';
let translations = require('./localization.json');


class Options extends Component {

    state = {
        availableLanguages: {
            isOpen: false
        },
        fadeAnim: new Animated.Value(0),
    };

    languages = [
        {   'code': 'ru',
            'title':'Русский',
            'flagUri': require('../../images/ru.png')
        },
        {   'code': 'uk',
            'title':'Українська',
            'flagUri': require('../../images/ua.png')
        },
        {   'code': 'en',
            'title':'English',
            'flagUri': require('../../images/en.png')
        },
    ];

    componentDidMount() {

        AsyncStorage.getItem('localization',(value)=>{
           if(value != null){
               this.langItemSelect(value);
           }
        });

        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 1,
                duration: 300,
            }
        ).start();

    }

    toggleLangSelect() {

        this.setState({
            availableLanguages: {
                isOpen: !this.state.availableLanguages.isOpen
            },
        });
    };

    langItemSelect(langCode) {
        AsyncStorage.setItem('localization', langCode);

        this.props.uiActions.toggleLanguage(langCode);

        this.setState({
            availableLanguages: {
                isOpen: false
            },
        });
    }


    render() {
        let fadeAnim = this.state.fadeAnim;

        let list = <Animated.View style={{...styles.list, opacity: fadeAnim}}>
            {this.languages.map((item,i) => (
                <TouchableHighlight key={i}
                                    onPress={this.langItemSelect.bind(this, item.code)}
                                    style={{...styles.item, display: (item.code == this.props.localization) ? 'none' : 'flex' }}>
                    <View style={styles.selectedFlex}>
                        <Image resizeMode={'cover'} style={{...styles.flag, width: 25, height: 25}}
                               source={item.flagUri}
                        />
                        <Text style={styles.selectedText}>
                            {item.title}
                        </Text>
                    </View>
                </TouchableHighlight>
            ))}
        </Animated.View>;

        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleTxt}>
                        {translations[this.props.localization]['settings']}
                    </Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.labelText}>
                        {translations[this.props.localization]['language']}
                    </Text>
                    <View style={styles.selectWrap}>
                            {this.languages.map((item,i) => {
                                if(item.code === this.props.localization){
                                    return (
                                        <TouchableHighlight key={i} onPress={this.toggleLangSelect.bind(this)} style={styles.label}>
                                            <View style={styles.selectedFlex}>
                                                <Image resizeMode={'cover'} style={styles.flag}
                                                       source={item.flagUri}
                                                />
                                                <Text style={styles.selectedText}>
                                                    {item.title}
                                                </Text>
                                                <Icon
                                                    style={styles.arrow}
                                                    name={(this.state.availableLanguages.isOpen)? "chevron-up" : "chevron-down" } />
                                            </View>
                                        </TouchableHighlight>
                                    )
                                }
                            } )}
                        {(this.state.availableLanguages.isOpen)? list : null }
                    </View>
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#F3F6F8',
    },
    title: {
        height: 56,
        borderBottomWidth: 1,
        borderBottomColor: '#D3DFE1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleTxt: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#5093DF'
    },
    content: {
        paddingTop: 12,
        paddingLeft: 8,
        paddingRight: 8
    },
    label: {
        backgroundColor: '#FFFFFF',
        height: 60,
        borderRadius: 5,
        paddingLeft: 15,
        paddingRight: 15,
        elevation: 1
    },
    labelText: {
        fontSize: 14,
        color: '#5093DF',
        fontWeight: 'bold',
        marginBottom: 5
    },
    selectWrap: {
        position: 'relative'
    },
    selectedFlex: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%'
    },
    selectedText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6F7071'

    },
    flag: {
        width: 25,
        height: 25,
        borderRadius: 13,
        marginRight: 10
    },
    list: {
        backgroundColor: 'rgba(255,255,255,0.85)',
        borderRadius: 5,
        position: 'absolute',
        left: 0,
        top: 70,
        width: '100%'
    },
    item: {
        height: 60,
        paddingLeft: 15,
        paddingRight: 15,
        borderTopWidth: 1,
        borderTopColor: '#EFEFEF'
    },
    arrow: {
        position: 'absolute',
        right: 0,
        top: 22,
        fontSize: 16,
        color: '#6F7071'
    }
};

function mapStateToProps (store) {

    return {
        localization: store.ui.localization
    }
}

function mapDispatchToProps(dispatch) {
    return {
        uiActions: bindActionCreators(uiActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Options)