/**
 * Created by Yaroslav on 09.09.2017.
 */
import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

class TabSelector extends Component {

    render(){

        return(
            <View style={styles.tabSel}>
                <TouchableHighlight style={styles.oneTabBut}>
                    <Text>Fast</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.oneTabBut}>
                    <Text>
                        S
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.oneTabBut}>
                    <Text>
                        La
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = {
    tabSel: {
        display: "flex",
        justifyContent: 'space-between',
        flexDirection: "row"
    },
    oneTabBut: {
        backgroundColor: '#FFFFFF',
        width: '32%',
        height: 105,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#EDEDED',
        position: 'relative'
    }
};

export default TabSelector