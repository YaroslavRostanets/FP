/**
 * Created by Yaroslav on 23.09.2017.
 */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../../src/config.json';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustIcon = createIconSetFromFontello(fontelloConfig);

class SearchTab extends Component {

    render(){

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
                    </View>
                </View>
                <View style={styles.oneRow}>
                    <View style={styles.iconWrap}>
                        <Icon name="hourglass-o" style={styles.icon} />
                    </View>
                    <View style={styles.rightPart}>
                        <Text style={styles.topDescr}>
                            Hours:
                        </Text>
                    </View>
                </View>
                <View style={{...styles.oneRow,borderBottomWidth: 0}}>
                    <View style={styles.iconWrap}>
                        <CustIcon name="distance-parking" style={styles.icon} />
                    </View>
                    <View style={styles.rightPart}>
                        <Text style={styles.topDescr}>
                            Distance:
                        </Text>
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
        paddingTop: 14,
        paddingBottom: 14
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
        fontSize: 16
    }
};

export default SearchTab


