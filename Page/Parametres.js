import { Text, StyleSheet, View, ScrollView, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { BottomNavbar, Topnavbar } from './Accueil'
import { useNavigation, useRoute } from '@react-navigation/native';
let ScreenHeight = Dimensions.get("window").height;



const Parametres = () => {

    const route = useRoute();
    const username = route.params.username;
    const imageList = route.params.imageList;

    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.screen}>
            <Topnavbar></Topnavbar>
            <ScrollView style={styles.screenview}>
                <View style={styles.height} >
                    <View style={styles.view}><Text style={{ fontSize: 20, color: "white", marginLeft: 20, }}>Changer le mot de passe</Text></View>
                    <Separator></Separator>
                    <View style={styles.view}><Text style={{ fontSize: 20, color: "white", marginLeft: 20 }}>Changer l'adresse email</Text></View>
                    <Separator></Separator>
                    <View style={styles.view}><Text style={{ fontSize: 20, color: "white", marginLeft: 20 }}>Supprimer photos/vidéos</Text></View>
                    <Separator></Separator>
                    <View style={styles.view}><Text style={{ fontSize: 20, color: "white", marginLeft: 20 }}>Politique de confidentialité</Text></View>
                    <Separator></Separator>
                </View>

            </ScrollView>
            <BottomNavbar></BottomNavbar>
        </SafeAreaView>
    )


}
export default Parametres
export function Separator() {
    return (
        <View style={{ height: 5, backgroundColor: "#363434" }}></View>
    )
}
const styles = StyleSheet.create({
    height: {
        height: ScreenHeight,

    },
    screen: {
        backgroundColor: '#00A6FF',
        height: ScreenHeight,
        justifyContent: 'center',


    },
    screenview: {
        backgroundColor: 'white',
        height: ScreenHeight,



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
    view: {
        width: "100%",
        backgroundColor: "#384044",
        justifyContent: 'center',
        alignItems: 'baseline',
        height: "15%",

    }


})