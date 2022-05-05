import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, ScrollView, SafeAreaView, Dimensions, Picker, TouchableOpacity, Alert, Button, Image, ActivityIndicator } from 'react-native'
import PhotosG from './PhotosGallery';
import CameraPicker from './CameraPicker'



async function Uploads() {

    const nom = "post" + Math.floor(Math.random() * (1000000 - 1 + 1) + 1) + ".jpeg";
    console.log('bas', username)
    const usernameJson = JSON.stringify({ username: username });



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
            //navigation.navigate("Accueil", { username: username })
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

                        console.log(response1);





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