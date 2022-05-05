import { Text, StyleSheet, View, ScrollView, Dimensions, SafeAreaView, Button, Pressable, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { BottomNavbar, Topnavbar } from './Accueil'
import { useNavigation, useRoute } from '@react-navigation/native';

import * as Font from 'expo-font';




let ScreenHeight = Dimensions.get("window").height;



export default class Avis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avis: [],
            fullAvis: [],
            userAvis: [],
            USERS: [],
            fontLoaded: false,
        };
    }


    componentDidMount() {





        fetch('https://hamza-dev.fr/insertAvis.php', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify("hamza")
        })
            .then((response) => response.json())
            .then((response) => {
                if (response != null) {

                    this.setState({
                        avis: response
                    })
                    //console.log(this.state.avis)
                }
            })


            .catch((error) => {
                alert("Error Occured");
            })
        fetch('https://hamza-dev.fr/FullAvis.php', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify("hamza")
        })
            .then((response) => response.json())
            .then((response) => {
                if (response != null) {

                    this.setState({
                        fullAvis: response
                    })
                    //console.log(this.state.fullAvis)
                }
            })


            .catch((error) => {
                alert("Error Occured");
            })
        fetch('https://hamza-dev.fr/fetchUser.php', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify("hamza")
        })
            .then((response) => response.json())
            .then((response) => {
                if (response != null) {

                    this.setState({
                        userAvis: response
                    })
                    console.log(this.state.userAvis)
                }
            })


            .catch((error) => {
                alert("Error Occured");
            })




    }


    render() {


        return (
            <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: "black" }}>
                <Topnavbar></Topnavbar>

                <ScrollView style={styles.scroll}>
                    <View style={styles.view}>

                        <Text style={{ fontSize: 20, color: '#000000', fontWeight: "bold" }}>Avis récents</Text>

                        <ScrollView horizontal style={{ width: '100%', backgroundColor: "white" }}>

                            {
                                this.state.userAvis.map((avis, index) => (
                                    <View style={styles.avisContainer} key={index}>
                                        <Text style={styles.avisText}>{avis.ContenuAvis.substring(0, 100) + "..."}</Text>
                                        <Text style={{ marginLeft: 10, marginTop: 20, marginBottom: 10 }}>Posté par {avis.username}</Text>
                                    </View>
                                ))
                            }
                        </ScrollView>
                        <TouchableOpacity style={styles.AddAvis} >
                            <Text style={styles.textbtn}>Écrire un avis...</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.AvisFull}>
                        <Text style={{ fontSize: 20, color: '#000000', fontWeight: "bold", marginVertical: 10 }}>Tous les avis</Text>
                        <ScrollView style={styles.ScrollAvis}>
                            {
                                this.state.userAvis.map((item, index) => (
                                    <View key={index} style={{ backgroundColor: '#FEFEFE', borderColor: 'black', borderRadius: 22 }}>
                                        <View style={{ backgroundColor: 'white', borderColor: 'black', }}>
                                            <Text style={{ fontStyle: 'italic', fontSize: 18, marginHorizontal: 15, marginBottom: 5, color: "black" }}>Posté par<Text style={{ fontWeight: "bold", color: '#DABA18', fontSize: 18 }}> {item.username}</Text></Text>
                                            <Text style={{ fontStyle: 'italic', marginLeft: 30, fontSize: 12, fontWeight: "bold", color: 'black' }}>le {item.datecreation.substring(0, 16)}</Text>
                                        </View>
                                        <View style={{ backgroundColor: '#FEFEFE', padding: 15, }}>
                                            <Text style={{ fontSize: 18, marginHorizontal: 15 }}>{item.ContenuAvis}</Text>
                                        </View>
                                    </View>

                                ))
                            }
                        </ScrollView>
                    </View>
                </ScrollView >
                <BottomNavbar></BottomNavbar>
            </SafeAreaView >
        )
    }
}

const styles = StyleSheet.create({
    AvisFull: {
        backgroundColor: "#FEFEFE",
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: "100%",

    },
    BottomNavbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'black'
    },
    avisContainer1: {

    },
    ScrollAvis: {
        backgroundColor: 'blue'
    },
    scroll: {
        backgroundColor: 'black',
        alignContent: 'center',




    },
    view: {
        backgroundColor: 'white',

        alignItems: 'center'

    },
    avisContainer: {
        backgroundColor: "white",
        borderColor: 'black', borderWidth: 2, margin: 5,
        width: 300

    },
    avisText: {
        fontSize: 18,
        marginLeft: 10
    },
    AddAvis: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',

    },
    textbtn: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        margin: 10

    }

})