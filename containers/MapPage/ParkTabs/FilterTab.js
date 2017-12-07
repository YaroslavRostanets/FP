/**
 * Created by Yaroslav on 23.09.2017.
 */

import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../../src/config.json';

import CheckboxField from 'react-native-checkbox-field'; // Field with label
import { Checkbox } from 'react-native-checkbox-field'; // Checkbox only

import Icon from 'react-native-vector-icons/FontAwesome';

const CustIcon = createIconSetFromFontello(fontelloConfig);

class FilterTab extends Component {

    state = {
        selected: false,
        selected2: true
    };

    selectCheckbox = () => {
        this.setState({
            selected: !this.state.selected,
        });
    };

    selectCheckbox2 = () => {
        this.setState({
            selected2: !this.state.selected2,
        });
    };

    render(){

        const { selected } = this.state;

        /*
        return (
            <View style={styles.filterTab}>
                <View style={styles.oneRow}>
                    <View style={styles.iconWrap}>
                        <CustIcon name="calendar" style={styles.icon} />
                    </View>
                    <View style={styles.rightPart}>
                        <Text style={styles.topDescr}>
                            Day2:
                        </Text>
                        <View style={styles.checkbox}>
                            <View>
                                <CheckboxField
                                    onSelect={this.selectCheckbox}
                                    selected={selected}
                                    labelSide="left"
                                >
                                    <Icon name="check" color="#fff" />
                                </CheckboxField>
                            </View>
                            <View>
                                <CheckboxField
                                    onSelect={this.selectCheckbox2}
                                    selected={selected}
                                    labelSide="right"
                                >
                                    <Icon name="check" color="#fff" />
                                </CheckboxField>
                            </View>

                        </View>
                    </View>
                </View>
                <View style={styles.oneRow}>
                    <CheckboxField
                        onSelect={this.selectCheckbox}
                        selected={selected}
                        label="Accept terms and conditions"
                        labelSide="right"
                    >
                        <Icon name="check" color="#fff" />
                    </CheckboxField>
                </View>
                <View style={{...styles.oneRow,borderBottomWidth: 0}}>

                </View>
            </View>
        )
        */
        return (
            <CheckboxField
                onSelect={this.selectCheckbox}
                selected={selected}
                label="Accept terms and conditions"
                labelSide="right"
            >
                <Icon name="check" color="#fff" />
            </CheckboxField>
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
        flexDirection: "row"
    }
};

export default FilterTab

