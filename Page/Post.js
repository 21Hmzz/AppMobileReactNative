import { Text, StyleSheet, View, ScrollView, SafeAreaView, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import Icon from './icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { RouteParams } from '../Navigation/RootNavigator'
import Icons from './icons';
import Separator from './Parametres';
import { USERS } from './Users';
import Divider from 'react-native-divider';

const Post = ({ post }) => {
    return (
        <View style={{ marginBottom: 30 }}>
            <Divider width={1} />
            <Text style={{ color: "white" }}>Post</Text>
            <PostHeader post={post} />

        </View>
    )

}
export default Post
const PostHeader = ({ post }) => {
    return (
        <Text style={{ color: 'white' }}>
            Post Header
        </Text>
    )

}