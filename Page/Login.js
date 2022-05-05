
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, KeyboardAvoidingView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import React, { Component, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userData: {},
      listeImage: [],
    };
  }
  async StockerUtilisateur(user) {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(user));
    } catch (error) {
      console.log("erreur", error);
    }
  }
  async RecupererUtilisateur(user) {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
      console.log("valeur", data);
    } catch (error) {
      console.log("erreur", error);
    }
  }
  componentDidMount() {
    console.log("debut", this.RecupererUtilisateur());

  }
  handleEmail = text => {
    this.setState({ email: text });
  };
  handlePassword = text => {
    this.setState({ password: text });
  };

  login = (email, password) => {
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var Data = {
      username: this.state.email,
      password: this.state.password,
    };
    var imageList = [];
    var user = ""
    fetch('https://hamza-dev.fr/login.php', {

      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data) //convert data to JSON
    }).then((response) => response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
      .then((response) => {
        console.log('??')
        if (response.result === "nul") {
          Alert.alert("Champs vide", "Veuillez entrer un nom d'utilisateur ET un mot de passe");
        }
        if (response.result === "ok") {
          console.log(this.state.email),
            user = response.result, this.StockerUtilisateur(this.state.email)
          fetch(
            'https://hamza-dev.fr/post.php',
            {
              method: 'POST',
              body: JSON.stringify({ username: this.state.email }),
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            }
          ).then((response1) => response1.json())
            .then((response1) => {
              //console.log("liste", response1);
              //imageList = response1;
              this.setState({
                listeImage: response1
              })
              //console.log("liste", imageList)
              this.props.navigation.navigate("Accueil", { username: this.state.email, imageList: this.state.listeImage });
            })

        }
        if (response.result === "Mot de passe incorrect") {
          Alert.alert("Utilisateur inconnu", "Utilisateur ou Mot de passe incorrect");

        }



      })
  }




  render() {


    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.loginstyle} >
        <View style={styles.loginstyle}>
          <View style={{ justifyContent: "center", alignItems: 'center' }}>
            <TextInput
              style={styles.textInput}
              underlineColorAndroid="transparent"
              placeholder="Nom d'utilisateur"
              placeholderTextColor="black"
              autoCapitalize="none"
              onChangeText={this.handleEmail}
            />

            <TextInput
              style={styles.textInput}
              underlineColorAndroid="transparent"
              placeholder="Mot de passe"
              placeholderTextColor="black"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={this.handlePassword}
            />
          </View>
          < View style={styles.btnview} >

            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.login(this.state.email, this.state.password)}
            >
              <Text style={{ textAlign: 'center', fontSize: 18, color: "black" }}> Connexion </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default Login
const styles = StyleSheet.create({
  loginstyle: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: "#EEC9A4"


  },
  btnview: {

    alignItems: 'center',
    height: 150,

  },
  btn: {
    fontSize: 18,
    width: '60%',
    backgroundColor: "white",
    padding: 15,
    borderWidth: 0.5,
    borderColor: "white",
    borderRadius: 12,
    marginTop: 30,

  },
  btn1: {
    textAlign: 'center',
    marginTop: 20,
  },
  info: {
    flex: 1,

    justifyContent: 'center',

  },
  viewStyle: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  textInput: {
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: "white",
    padding: 10,
    height: 50,
    fontSize: 20,
    width: "80%",



  },

})
