import { Text, StyleSheet, View, ScrollView, SafeAreaView, Dimensions, TouchableOpacity, Image, Button } from 'react-native'
import React, { Component, useState } from 'react'
import FullScreen from 'react-native-full-screen'






export function FetchPost() {
    const [username, setUsername] = useState(null);
    fetch('https://hamza-dev.fr/fetchUser.php', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify("hamza") //convert data to JSON
    })
        .then((response) => response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
        .then((response) => {
            console.log(response);

            setUsername(response);
            alert(username)


        })
        .catch((error) => {
            alert("Error Occured" + error);
        })

}
export const USERS = [{
    user: "hamza",


}];




