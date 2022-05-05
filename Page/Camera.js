import { Text, StyleSheet, View, ScrollView, SafeAreaView, Dimensions, TouchableOpacity, Image, Button, StatusBar, Alert } from 'react-native'
import React, { Component, useState } from 'react'
import Icon from './icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BottomNavbar, Topnavbar } from './Accueil'
import * as ImagePicker from 'expo-image-picker';







let ScreenHeight = Dimensions.get("window").height;

export default function Camera() {


    const data = ["test1", "test2", 'test3'];



    return (
        <SafeAreaView style={styles.screen}>
            <Topnavbar></Topnavbar>
            <ScrollView style={styles.screenview}>
                <TakeImage></TakeImage>
            </ScrollView>
            <BottomNavbar></BottomNavbar>
        </SafeAreaView>


    )

}
export function TakeImage() {
    const [image, setImage] = useState(null);
    const [type, setType] = useState(null);
    const [btnuploads, setBtn] = useState(null);
    const route = useRoute();
    const username = route.params.username;
    var imageList = [];
    const navigation = useNavigation();
    const PhotosG = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
            setType(result.type);
            setBtn("1");

        }

    }
    const CameraPicker = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        if (granted) {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.5,
                videoQuality: 0.5,
                videoMaxDuration: 60,
            })

            console.log(result);
            const infoimage = result;

            if (!result.cancelled) {
                setImage(result.uri);
                setType(result.type);
                setBtn(1);

            }

        };
    }
    function Affbtn() {
        if (image != null) {
            return (
                <Text style={styles.btn} onPress={Uploads}> Enregistrer</Text>
            )
        } else {
            return (
                <Text style={styles.btn} onPress={() => Alert.alert("Aucune image choisie")}> Enregistrer</Text>
            )
        }
    }
    async function Uploads() {

        const nom = "post" + Math.floor(Math.random() * (1000000 - 1 + 1) + 1) + ".jpeg";
        console.log('bas', username)
        const usernameJson = JSON.stringify({ username: username });
        var imageList = [];




        const data = new FormData();
        data.append('image', {
            uri: image,
            name: nom,
            type: 'image/jpeg',

        });
        data.append(
            usernameJson
        )



        fetch(
            'https://hamza-dev.fr/uploads.php',
            {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                },

            }
        ).then((response) => response.json())
            .then((response) => {
                console.log('response', response);
                Alert.alert("Votre photo a bien été enregistré")
                console.log(username);
                const PostUrl = response;
                console.log(PostUrl);
                if (PostUrl != null) {
                    fetch(
                        'https://hamza-dev.fr/insert.php',
                        {
                            method: 'POST',
                            body: JSON.stringify({ username: username, url: PostUrl }),
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                        }
                    ).then((response1) => response1.json())
                        .then((response1) => {
                            //console.log("liste", response1);
                            imageList = response1;
                            console.log("liste", imageList);




                            //console.log(response1);
                            //console.log(imageList);
                            navigation.navigate("Accueil", { username: username, imageList: imageList })

                        }


                        )
                        .catch((error) => {
                            console.log('error', data);
                            console.log('error', error);

                        });
                }


            })
            .catch((error) => {
                console.log('error', data);
                console.log('error', error);

            });






    }
    return (
        <View style={styles.uploads}>
            <Text>Uploads de photos/vidéos</Text>
            <Text style={styles.btn} onPress={PhotosG} >Choisir dans ma galerie</Text>
            <Text style={styles.btn} onPress={CameraPicker} >Prendre une photo</Text>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <Affbtn></Affbtn>

        </View>
    )


}













































const styles = StyleSheet.create({
    btn: {
        fontSize: 18,
        width: '60%',

        padding: 15,
        borderWidth: 0.5,
        borderColor: "#918F8B",
        borderRadius: 18,
        margin: 12,


    },
    uploads: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginTop: '20%',

    },
    screen: {
        backgroundColor: 'black',
        height: ScreenHeight,

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
