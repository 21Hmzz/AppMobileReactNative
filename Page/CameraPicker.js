import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, ScrollView, SafeAreaView, Dimensions, Picker, TouchableOpacity, Alert, Button, Image, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker';

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

export default CameraPicker
