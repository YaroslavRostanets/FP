/**
 * Created by Yaroslav on 23.09.2017.
 */
import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TimePickerAndroid } from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../../../src/config.json';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Icon from 'react-native-vector-icons/FontAwesome';

import {MONFRY, SAT, SUN, FROM, TO} from '../../../../constants/Filter'

import CheckboxField from 'react-native-checkbox-field';

const CustIcon = createIconSetFromFontello(fontelloConfig);

class SearchTab extends Component {

    state = {
        MONFRY: true,
        SAT: false,
        SUN: true,
        filterFrom: "14-00",
        filterTo: "16-00",
        filterTimeFrom: "30min",
        filterTimeTo: "12h",
        sliderValues: [1, 6],
        sliderDistanceValue: [3],
        distance: 8
    };

    sliderValuesChange = (values) => {
        this.setState({
            sliderValues: values,
        });
        this.sliderConvertToTime(values);
    };

    sliderConvertToTime = (values) => {
        let convertObj = {
            "0":"0",
            "1":"30min",
            "2":"1h",
            "3":"2h",
            "4":"3h",
            "5":"5h",
            "6":"12h",
            "7":"24h"
        };

        this.setState({
            filterTimeFrom: convertObj[values[0]],
            filterTimeTo: convertObj[values[1]]
        });
    };

    sliderConvertDistance = (values) => {
        let convertObj = {
            "0":"2",
            "1":"4",
            "2":"6",
            "3":"8",
            "4":"10",
            "5":"12",
            "6":"14",
            "7":"16",
            "8":"18",
            "9":"19",
            "10":"20"
        };
        this.setState({
            distance: convertObj[values]
        });
    };

    sliderDistanceChange = (values) => {
        this.setState({
            sliderDistanceValue: values,
        });
        this.sliderConvertDistance(values);

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
                //console.log("Error, Ошибка установки дней");
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
            //console.warn('Cannot open time picker', message);
        }

    };

    render(){

        const monFry = this.state.MONFRY;
        const sat = this.state.SAT;
        const sun = this.state.SUN;
        const filterFrom = this.state.filterFrom;
        const filterTo = this.state.filterTo;
        const initValues = this.state.sliderValues;
        const filterTimeFrom = this.state.filterTimeFrom;
        const filterTimeTo = this.state.filterTimeTo;
        const initDistance = this.state.sliderDistanceValue;
        const distance = this.state.distance;

        return (
            <View style={styles.searchTab}>
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
                <View style={styles.oneRow}>
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
                <View style={styles.oneRow}>
                    <View style={styles.iconWrap}>
                        <Icon name="hourglass-o" style={styles.icon} />
                    </View>
                    <View style={styles.rightPart}>
                        <Text style={{...styles.topDescr, marginBottom: 15}}>
                            Hours:<Text style={styles.grayText}> from <Text style={styles.b}>{filterTimeFrom} </Text>
                            to <Text style={styles.b}>{filterTimeTo}</Text></Text>
                        </Text>
                        <MultiSlider values={initValues} sliderLength={245}
                                     onValuesChange={this.sliderValuesChange}
                                     max={7}
                                     markerStyle={{
                                         backgroundColor: '#2182D6'
                                     }}
                                     selectedStyle={{
                                         backgroundColor: '#2182D6',
                                     }}
                                     unselectedStyle={{
                                         backgroundColor: 'silver',
                                     }}
                        />
                    </View>
                </View>
                <View style={{...styles.oneRow,borderBottomWidth: 0}}>
                    <View style={styles.iconWrap}>
                        <CustIcon name="distance-parking" style={styles.icon} />
                    </View>
                    <View style={styles.rightPart}>
                        <Text style={{...styles.topDescr, marginBottom: 15}}>
                            Distance: <Text style={styles.grayText}>{distance} km</Text>
                        </Text>
                        <MultiSlider
                            values={initDistance}
                            sliderLength={245}
                            onValuesChange={this.sliderDistanceChange}
                            markerStyle={{
                                backgroundColor: '#2182D6'
                            }}
                            selectedStyle={{
                                backgroundColor: '#2182D6',
                            }}
                            unselectedStyle={{
                                backgroundColor: 'silver',
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = {
    searchTab: {
        paddingLeft: 12,
        paddingRight: 12,
        height: 250
    },
    oneRow: {
        height: "25%",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        borderStyle: "solid",
        display: "flex",
        flexDirection: "row",
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 5,
        paddingBottom: 5
    },
    iconWrap: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginRight: 18,
        width: 40
    },
    icon: {
        fontSize: 37
    },
    rightPart: {
        display: "flex",
        flexDirection: "column"
    },
    topDescr: {
        color: "#5093DF",
        fontSize: 15
    },
    checkbox: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        marginTop: -3
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
    },
    b: {
        fontWeight: "bold"
    }
};

export default SearchTab


