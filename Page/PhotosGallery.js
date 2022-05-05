import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, ScrollView, SafeAreaView, Dimensions, Picker, TouchableOpacity, Alert, Button, Image, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker';

const PhotosG = async () => {
  const [image, setImage] = useState(null);
  const [type, setType] = useState(null);

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



export default PhotosG
