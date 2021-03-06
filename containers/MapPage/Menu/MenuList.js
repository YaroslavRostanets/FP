/**
 * Created by Yaroslav on 27.08.2017.
 */
import React, { Component } from 'react';
import { Text, View, StyleSheet, Animated, Dimensions, TouchableHighlight } from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../../src/config.json';

const Icon = createIconSetFromFontello(fontelloConfig);

class MenuList extends Component {

    goToScreen(screenTitle) {
        this.props.navigator.push({
            title: screenTitle,
            animationType: 'FloatFromBottom'
        })
    }

    render(){

        return(
            <View style={styles.menuContent}>
                <View style={styles.profile}>
                    <Icon name="profile" style={styles.ico} />
                    <Text style={styles.menuItem}>Profile</Text>
                </View>

                <View style={styles.middleMenu}>
                    <View style={styles.middleMenuItem}>
                        <Icon name="favorite" style={styles.ico} />
                        <Text style={styles.menuItem}>Favorite</Text>
                    </View>
                    <View style={styles.middleMenuItem}>
                        <Icon name="map" style={styles.ico} />
                        <Text style={styles.menuItem}>Map settings</Text>
                    </View>
                    <TouchableHighlight onPress={this.goToScreen.bind(this, 'AddPlace')} style={styles.middleMenuItem}>
                        <View style={styles.botMenuItemIn}>
                            <Icon name="plus" style={styles.ico} />
                            <Text style={styles.menuItem}>Add new parking</Text>
                        </View>
                    </TouchableHighlight>
                </View>

                <View style={styles.botMenu}>
                    <TouchableHighlight onPress={this.goToScreen.bind(this, 'Options')} style={styles.botMenuItem}>
                        <Text style={styles.menuItem}>
                            Option
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.goToScreen.bind(this, 'Info')} style={styles.botMenuItem}>
                        <Text style={styles.menuItem}>
                            Info
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
   menuContent: {
       paddingLeft: 10,
       paddingRight: 10
   },
    profile: {
        height: 80,
        display: "flex",
        alignItems: "center",
        flexDirection: "row"
    },
    ico: {
        fontSize: 28,
        color: "#5093DF",
        marginLeft: 12,
        marginRight: 20
    },
    menuItem: {
        fontSize: 16,
        color: "#5093DF"
    },
    middleMenu: {
        paddingTop: 13,
        paddingBottom: 13,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: "#F0F0F0",
        borderStyle: "solid"
    },
    middleMenuItem: {
        height: 60,
        alignItems: "center",
        display: "flex",
        flexDirection: "row"
    },
    botMenuItem: {
        height: 50,
        paddingLeft: 30,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    botMenuItemIn: {
       flexDirection: 'row'
    }
});

export default MenuList