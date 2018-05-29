/**
 * Created by Yaroslav on 23.09.2017.
 */
import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TimePickerAndroid, ActivityIndicator } from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as placesActions from '../../../../actions/placesActions';
import fontelloConfig from '../../../../src/config.json';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Icon from 'react-native-vector-icons/FontAwesome';

import {MONFRY, SAT, SUN, FROM, TO} from '../../../../constants/Filter'

import CheckboxField from 'react-native-checkbox-field';

const CustIcon = createIconSetFromFontello(fontelloConfig);

class SearchTab extends Component {

    state = {
        MONFRY: this.props.monFry,
        SAT: this.props.sat,
        SUN: this.props.sun,
        filterFrom: this.props.filterFrom,
        filterTo: this.props.filterTo,
        filterTimeFrom: "30min",
        sliderValues: [1],
        sliderDistanceValue: [3],
        distance: 8
    };

    sliderValuesChange = (values) => {

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
            filterTimeFrom: convertObj[ values[0] ],
        });

    };

    sliderValuesChangeFinish = (values) => {
        this.setState({
            sliderValues: values
        }, () => {
            this.props.placesActions.editSearchOptions(this.state);
        });
    };

    sliderDistanceChange = (values) => {
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
            distance: convertObj[values[0]]
        });
    };

    sliderDistanceChangeEnd = (values) => {
          this.setState({
              sliderDistanceValue: values
          }, () => {
              this.props.placesActions.editSearchOptions(this.state);
          });
    };

    selectCheckbox = (selectedDays) => {

        this.setState({
            [selectedDays]:!this.state[selectedDays]
        }, ()=>{
           this.props.placesActions.editSearchOptions(this.state);
        });

    };

    async filterSetTime(fromOrTo) {
        try {
            const {action, hour, minute} = await TimePickerAndroid.open({
                hour: (fromOrTo == FROM) ? eval(this.state.filterFrom) : eval(this.state.filterTo),
                minute: 0,
                is24Hour: true
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                let rightMinFormat = (minute.toString().length > 1) ? minute.toString() : '0' + minute.toString();
                let returnTime = `${hour}-${rightMinFormat}`;

                if(fromOrTo == FROM){
                    if(eval(returnTime) >= eval(this.state.filterTo)){

                        this.setState({
                            filterFrom: returnTime,
                            filterTo: (eval(returnTime) == 23)? '23-59' :`${eval(returnTime)+1}-00`
                        }, ()=>{
                            this.props.placesActions.editSearchOptions(this.state);
                        });
                    } else {
                        this.setState({
                            filterFrom: returnTime
                        }, ()=>{
                            this.props.placesActions.editSearchOptions(this.state);
                        });
                    }
                } else if (fromOrTo == TO) {
                    if(eval(returnTime) <= eval(this.state.filterFrom)){
                        returnTime = (eval(returnTime) == 23)? '23-59' : `${eval(this.state.filterFrom)+1}-00`;
                    }

                    this.setState({
                        filterTo: returnTime
                    },()=>{
                        this.props.placesActions.editSearchOptions(this.state);
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
        const loader = this.props.loader;
        const filterFrom = this.state.filterFrom;
        const filterTo = this.state.filterTo;
        const filterTimeFrom = this.state.filterTimeFrom;
        const initDistance = this.state.sliderDistanceValue;
        const distance = this.state.distance;

        return (
            <View>
                <View style={{...styles.loaderWrap, display: (loader) ? 'flex' : 'none' }}>
                    <ActivityIndicator size="large" color="#247FD2" />
                </View>
                <View style={{...styles.searchTab, display: (loader) ? 'none' : 'flex'  }}>
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
                                        selected={this.props.monFry}
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
                                        selected={this.props.sat}
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
                                        selected={this.props.sun}
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
                                Hours:
                                <Text style={styles.grayText}> from
                                    <Text style={styles.b}> {filterTimeFrom} </Text>
                                </Text>
                            </Text>
                            <MultiSlider values={this.state.sliderValues} sliderLength={245}
                                         onValuesChange={this.sliderValuesChange}
                                         onValuesChangeFinish={this.sliderValuesChangeFinish}
                                         max={7}
                                         touchDimensions={{
                                         height: 65,
                                         width: 65,
                                         slipDisplacement: 65
                                     }}
                                         markerStyle={{
                                         backgroundColor: '#2182D6',
                                         height: 20,
                                         width: 20,
                                         borderRadius: 10
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
                                onValuesChangeFinish={this.sliderDistanceChangeEnd}
                                markerStyle={{
                                backgroundColor: '#2182D6',
                                height: 20,
                                width: 20,
                                borderRadius: 10
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
    },
    loaderWrap: {
        height: 250,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
};

function mapStateToProps (store) {

    return {
        loader: store.places.searchFilter.loader,
        monFry: store.places.searchFilter.MONFRY,
        sat: store.places.searchFilter.SAT,
        sun: store.places.searchFilter.SUN,
        filterFrom: store.places.searchFilter.filterFrom,
        filterTo: store.places.searchFilter.filterTo,
        distance: store.places.searchFilter.distance
    }
}

function mapDispatchToProps(dispatch) {
    return {
        placesActions: bindActionCreators(placesActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchTab)


