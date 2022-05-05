import { Text, StyleSheet, View, ScrollView, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { BottomNavbar, Topnavbar } from './Accueil'
import { useRoute } from '@react-navigation/native';
import Icons from './icons';
let ScreenHeight = Dimensions.get("window").height;
export default class Profil extends Component {
    render() {
        const { route } = this.props;
        function AffUser() {
            const route = useRoute();
            const imageList = route.params.imageList;
            return (
                <View>
                    <View style={styles.profil}>

                        <Icons.MaterialCommunityIcons style={{ color: "white" }} name="account" size={160} ></Icons.MaterialCommunityIcons>
                        <Text style={{ fontSize: 30, color: "white", }}>{route.params.username}</Text>

                    </View>
                    <ScrollView>


                    </ScrollView>
                </View>

            )
        }

        return (
            <SafeAreaView style={styles.screen}>
                <Topnavbar></Topnavbar>
                <AffUser></AffUser>
                <ScrollView style={styles.screenview}>

                </ScrollView>
                <BottomNavbar></BottomNavbar>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: 'black',
        height: ScreenHeight,

    },
    profil: {
        justifyContent: 'center',
        alignItems: "center",
    },
    screenview: {
        backgroundColor: 'white',

    },
    Text: {
        fontSize: 30,
    },
    BottomNavbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    BottomNavbar1: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 5

    },


})