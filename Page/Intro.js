import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableOpacity } from 'react-native'
import React, { Component, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import FadingSlides from 'react-native-fading-slides';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserKey } from './clé';




export class Intro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageList: [],

        };

    }



    async RecupererUtilisateur() {
        imageList = this.imageList;


        try {
            let userData = await AsyncStorage.getItem(UserKey);
            let data = JSON.parse(userData);
            console.log("Valeur", data);
            if (data == null) {
                console.log("ko")
            }
            if (data !== null) {
                console.log("ok")
                if (this.imageList == null) {
                    fetch(
                        'https://hamza-dev.fr/post.php',
                        {
                            method: 'POST',
                            body: JSON.stringify({ username: data }),
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                        }
                    ).then((response1) => response1.json())
                        .then((response1) => {
                            //console.log("liste", response1);
                            this.imageList = response1;
                            console.log("liste", this.imageList);
                            this.props.navigation.navigate("Accueil", { username: data, imageList: this.imageList });
                        })
                } else {
                    this.props.navigation.navigate("Accueil", { username: data });

                }



            }
        } catch (error) {
            console.log("erreur", error);
        }


    }
    componentDidMount() {
        console.log(this.RecupererUtilisateur());

    }

    render() {
        const { navigation } = this.props;


        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.view1}>

                    <Image style={styles.Logo} source={require('../assets/Vvalogo.png')} />
                </View>
                <View style={styles.view2}>
                    <Text
                        style={styles.text} >Bienvenue sur l'application Village Vacances Alpes</Text>
                </View>
                <View style={styles.view3}>
                    <TouchableOpacity
                        style={styles.btnconnexion}
                        onPress={() => navigation.navigate("Login")}
                        activeOpacity={0.3}>
                        <Text
                            style={{ textAlign: 'center', fontSize: 18, color: "#9A5A15" }}>Commencer</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        )

    }
}













const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#2886B1",
        width: "100%",
    },
    view1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        marginTop: '10%'



    },
    view2: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",



    },
    Logo: {
        flex: 1,
        resizeMode: "stretch",
        width: "90%",


    },
    view3: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",


    },
    text: {
        fontSize: 24,
        textAlign: 'center',
        margin: 10,
        color: 'white',
    },
    btnconnexion: {
        fontSize: 18,
        width: '60%',
        backgroundColor: "white",
        padding: 15,
        borderWidth: 0.5,
        borderColor: "white",
        borderRadius: 12,

    }
})

export default Intro