/**
 * Created by Yaroslav on 09.09.2017.
 */
import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../../src/config.json';
import { connect } from 'react-redux'

const CustIcon = createIconSetFromFontello(fontelloConfig);

class TabSelector extends Component {

    render(){

        return(
            <View style={styles.tabSel}>
                <TouchableHighlight style={styles.oneTabBut}>
                    <View style={styles.align}>
                        <CustIcon name="rocket" style={styles.tabIcon}/>
                        <Text style={styles.tabDescr}>Fast parking</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.oneTabBut}>
                    <View style={styles.align}>
                        <CustIcon name="filter" style={styles.tabIcon}/>
                        <Text style={styles.tabDescr}>Filter</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.oneTabBut}>
                    <View style={styles.align}>
                        <CustIcon name="loupe" style={styles.tabIcon}/>
                        <Text style={styles.tabDescr}>Search</Text>
                    </View>
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
    },
    align: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabDescr: {
        fontSize: 16,
        color: '#6F7071'
    },
    tabIcon: {
        fontSize: 40,
        marginBottom: 5
    }
};

function mapStateToProps (store) {
    return {
        activeTab: store.ui.activeTab
    }
}

export default connect(mapStateToProps)(TabSelector);