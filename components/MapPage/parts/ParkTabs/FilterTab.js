/**
 * Created by Yaroslav on 23.09.2017.
 */

import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TimePickerAndroid, AsyncStorage, ActivityIndicator } from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../../../src/config.json';
import CheckboxField from 'react-native-checkbox-field';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Icon from 'react-native-vector-icons/FontAwesome';

import {MONFRY, SAT, SUN, FROM, TO} from '../../../../constants/Filter'

const CustIcon = createIconSetFromFontello(fontelloConfig);

class FilterTab extends Component {

    state = {
        MONFRY: false,
        SAT: false,
        SUN: false,
        filterFrom: "00-00",
        filterTo: "23-59",
        filterTimeFrom: "30min",
        sliderValues: [1],
        loader: true
    };

    async initFilter(){
        await AsyncStorage.multiGet(['MONFRY', 'SAT', 'SUN'], (err, filterItems)=>{
            let newState = {};
            filterItems.forEach((item) => {
                if( item[1] != null ){
                    newState[item[0]] = eval(item[1])
                } else {
                    AsyncStorage.setItem(item[0], this.state[item[0]].toString());
                }
            });

            this.setState(newState);

        });

        await AsyncStorage.multiGet(['filterFrom', 'filterTo', 'filterTimeFrom'], (err, filterItems)=>{
            let newState = {};
            filterItems.forEach((item) => {
                if( item[1] != null ){
                    newState[item[0]] = item[1]
                } else {
                    AsyncStorage.setItem(item[0], this.state[item[0]]);
                }
            });
            this.setState(newState);
        });


        try {
            const value = await AsyncStorage.getItem('sliderValues');
            if (value !== null){
                let valueArray = value.split(',').map(function(itemStrToNum) {
                    return Number(itemStrToNum);
                });
                this.setState({
                    sliderValues: valueArray,
                });
            } else {
                AsyncStorage.setItem(value, this.state[value]);
            }
            this.setState({
                loader: false
            });
        } catch (error) {
            // Error retrieving data
        }

    }


    setCheckedDay(itemName, value) {
        try {
            this.setState(() => {

                return {
                    [itemName]:eval(value)
                };

            }, async ()=> {
                await AsyncStorage.setItem(itemName, value.toString());
            } );
        } catch (error) {
            console.log("Error saving data" + error);
        }
    }

    componentWillMount() {
        this.initFilter();
    }

    selectCheckbox = (selectedDays) => {
        //this.setCheckedDay([selectedDays], !eval( this.state[selectedDays] ) );
        switch(selectedDays) {
            case MONFRY:
                this.setCheckedDay('MONFRY', !eval( this.state.MONFRY ) );
                break;
            case SAT:
                this.setCheckedDay('SAT', !eval( this.state.SAT ) );
                break;
            case SUN:
                this.setCheckedDay('SUN', !eval( this.state.SUN ) );
                break;
            default :
            console.log("Error, Ошибка установки дней");
        }

        this.setState({
            selectedDays: false
        })

    };

    sliderValuesChange = (values) => {
        this.setState({
            sliderValues: values,
        });
        this.sliderConvertToTime(values);
    };

    sliderConvertToTime = (values) => {
        let convertObj = {
            "0":"15min",
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
            sliderValues: values
        }, ()=> {
            AsyncStorage.setItem('filterTimeFrom', convertObj[values[0]]);
            AsyncStorage.setItem('sliderValues', values.join());
        } );

    };

    async filterSetTime(fromOrTo) {

        try {
            const {action, hour, minute} = await TimePickerAndroid.open({
                hour: (fromOrTo == FROM) ? eval(this.state.filterFrom) : eval(this.state.filterTo),
                minute: 0,
                is24Hour: true,
                mode: 'spinner'
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                let rightMinFormat = (minute.toString().length > 1)? minute.toString() : '0' + minute.toString();
                let returnTime = `${hour}-${rightMinFormat}`;

                if(fromOrTo == FROM){
                    if(eval(returnTime) >= eval(this.state.filterTo)){
                        this.setState({
                            filterFrom: returnTime,
                            filterTo: (eval(returnTime) == 23)? '23-59' :`${eval(returnTime)+1}-00`
                        },()=>{
                            AsyncStorage.setItem('filterFrom', returnTime);
                            AsyncStorage.setItem('filterTo', (eval(returnTime) == 23)? '23-59' : `${eval(returnTime)+1}-00`);
                        });
                    } else {
                        this.setState({
                            filterFrom: returnTime
                        },()=>{
                            AsyncStorage.setItem('filterFrom', returnTime);
                        });
                    }
                } else if (fromOrTo == TO) {
                    if(eval(returnTime) <= eval(this.state.filterFrom)){
                        returnTime = (eval(returnTime) == 23)? '23-59' : `${eval(this.state.filterFrom)+1}-00`;
                    }
                    this.setState({
                       filterTo: returnTime
                    },()=>{
                        AsyncStorage.setItem('filterTo', returnTime);
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
        const loader = this.state.loader;


        return (
            <View>
                <View style={{...styles.loaderWrap, display: (loader) ? 'flex' : 'none' }}>
                    <ActivityIndicator size="large" color="#247FD2" />
                </View>
                <View style={{...styles.filterTab, display: (loader) ? 'none' : 'flex'}}>
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
                                <TouchableHighlight style={styles.setTime} onPress={this.filterSetTime.bind(this,"TO")}>
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
                            <View style={{marginBottom: 10}}>
                                <Text style={styles.grayText}>from <Text style={styles.b}>{filterTimeFrom} </Text>
                                    to <Text style={styles.b}>{filterTimeTo}</Text></Text>
                            </View>
                            <MultiSlider values={initValues} sliderLength={245}
                                         onValuesChange={this.sliderValuesChange}
                                         max={7}
                                         markerStyle={{
                                         backgroundColor: '#2182D6'
                                         }}
                                         pressedMarkerStyle={{
                                            height: 25,
                                            width: 25,
                                            borderRadius: 15
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
        justifyContent: "center",
        flexDirection: "row",
        marginRight: 20,
        width: 45
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
    },
    b: {
        fontWeight: "bold"
    },
    loaderWrap: {
        height: 250,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

};

export default FilterTab

