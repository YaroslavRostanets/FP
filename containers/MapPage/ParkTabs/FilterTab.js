/**
 * Created by Yaroslav on 23.09.2017.
 */

import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TimePickerAndroid } from 'react-native';
import TimeRangeSlider from './TimeRangeSlider';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../../src/config.json';
import CheckboxField from 'react-native-checkbox-field';
import Icon from 'react-native-vector-icons/FontAwesome';

import {MONFRY, SAT, SUN, FROM, TO} from '../../../constants/Filter'

const CustIcon = createIconSetFromFontello(fontelloConfig);

class FilterTab extends Component {

    state = {
        MONFRY: true,
        SAT: false,
        SUN: true,
        filterFrom: "14-00",
        filterTo: "16-00"
    };

    selectCheckbox = (selectedDays) => {

        switch(selectedDays) {
            case MONFRY:
                this.setState({
                    MONFRY: !this.state.MONFRY
                });
                break;
            case SAT:
                this.setState({
                    SAT: !this.state.SAT
                });
                break;
            case SUN:
                this.setState({
                    SUN: !this.state.SUN
                });
                break;
            default :
                console.log("Error, Ошибка установки дней");
        }

        this.setState({
            selectedDays: false
        })

    };

    async filterSetTime(fromOrTo) {
        try {
            const {action, hour, minute} = await TimePickerAndroid.open({
                hour: 12,
                minute: 0,
                is24Hour: true
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                var returnTime = `${hour}-${minute}`;
                if(fromOrTo == FROM){
                    this.setState({
                        filterFrom: returnTime
                    });
                } else if (fromOrTo == TO) {
                    this.setState({
                        filterTo: returnTime
                    });
                }
            }
            if (action !== TimePickerAndroid.timeSetAction) {

            }
        } catch ({code, message}) {
            console.warn('Cannot open time picker', message);
        }

    };

    render(){

        const monFry = this.state.MONFRY;
        const sat = this.state.SAT;
        const sun = this.state.SUN;
        const filterFrom = this.state.filterFrom;
        const filterTo = this.state.filterTo;


        return (
            <View style={styles.filterTab}>
                <View style={styles.oneRow}>
                    <View style={styles.iconWrap}>
                        <CustIcon name="calendar" style={styles.icon} />
                    </View>
                    <View style={styles.rightPart}>
                        <Text style={styles.topDescr}>
                            Day:
                        </Text>
                        <View style={styles.checkbox}>
                            <View style={{...styles.oneCheck,marginLeft: -20, width: "auto"}}>
                                <CheckboxField
                                    onSelect={this.selectCheckbox.bind(this,MONFRY)}
                                    selected={monFry}
                                    labelSide="right"
                                    label="Mon-Fry"
                                    labelStyle={styles.labelStyle}
                                >
                                    <Icon name="check" color="#fff" />
                                </CheckboxField>
                            </View>
                            <View style={{...styles.oneCheck, width: "auto"}}>
                                <CheckboxField
                                    onSelect={this.selectCheckbox.bind(this, SAT)}
                                    selected={sat}
                                    labelSide="right"
                                    label="Sat"
                                    labelStyle={styles.labelStyle}
                                >
                                    <Icon name="check" color="#fff" />
                                </CheckboxField>
                            </View>
                            <View style={{...styles.oneCheck, width: "auto"}}>
                                <CheckboxField
                                    onSelect={this.selectCheckbox.bind(this, SUN)}
                                    selected={sun}
                                    labelSide="right"
                                    label="Sun"
                                    labelStyle={styles.labelStyle}
                                >
                                    <Icon name="check" color="#fff" />
                                </CheckboxField>
                            </View>

                        </View>
                    </View>
                </View>
                <View style={{...styles.oneRow}}>
                    <View style={styles.iconWrap}>
                        <CustIcon name="clock" style={styles.icon} />
                    </View>
                    <View style={styles.rightPart}>
                        <Text style={styles.topDescr}>
                            Time:
                        </Text>
                        <View style={styles.selTime}>
                            <Text style={styles.grayText}>
                                from
                            </Text>
                            <TouchableHighlight style={styles.setTime} onPress={this.filterSetTime.bind(this,"FROM")}>
                                <View style={styles.setTimeIn}>
                                    <Icon name="clock-o" style={styles.btnIcon} />
                                    <Text style={styles.txtIcon}>
                                        {filterFrom}
                                    </Text>
                                </View>
                            </TouchableHighlight>
                            <Text style={styles.grayText}>
                                to
                            </Text>
                            <TouchableHighlight style={styles.setTime} onPress={this.filterSetTime.bind(this, TO)}>
                                <View style={styles.setTimeIn}>
                                    <Icon name="clock-o" style={styles.btnIcon} />
                                    <Text style={styles.txtIcon}>
                                        {filterTo}
                                    </Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                <View style={{...styles.oneRow,borderBottomWidth:0}}>
                    <View style={styles.iconWrap}>
                        <Icon name="hourglass-o" style={styles.icon} />
                    </View>
                    <View style={styles.rightPart}>
                        <Text style={styles.topDescr}>
                            Hours:
                        </Text>
                        <TimeRangeSlider />
                    </View>
                </View>
            </View>
        )

    }
}


const styles = {
    filterTab: {
        paddingLeft: 12,
        paddingRight: 12,
        height: 250
    },
    oneRow: {
        height: "33%",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        borderStyle: "solid",
        display: "flex",
        flexDirection: "row",
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 14,
        paddingBottom: 14
    }
    ,
    iconWrap: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        marginRight: 25
    },
    icon: {
        fontSize: 40
    },
    rightPart: {
        display: "flex",
        flexDirection: "column"
    },
    topDescr: {
        color: "#5093DF",
        fontSize: 16
    },
    checkbox: {
        display: "flex",
        flexDirection: "row",
        width: "100%"
    },
    oneCheck: {
        width: 120,
        marginLeft: -20,
        flexGrow: 1
    },
    labelStyle: {
        fontSize: 14,
        color: "#6F7071",
        marginLeft: 8
    },
    checkboxStyle: {
        width: 24,
        height: 24
    },
    selTime: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row"
    },
    selTimeText: {
        fontSize: 20,
        color: "#FFFFFF"
    },
    setTimeIn: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#247FD2",
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 6,
        paddingRight: 6,
        marginLeft: 7,
        marginRight: 7,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#DDDDDD"
    },
    txtIcon: {
        fontSize: 15,
        color: "#FFFFFF"
    },
    btnIcon: {
        fontSize: 16,
        color: "#FFFFFF",
        marginRight: 3
    },
    grayText: {
        fontSize: 16,
        color: "#757575"
    }

};

export default FilterTab

