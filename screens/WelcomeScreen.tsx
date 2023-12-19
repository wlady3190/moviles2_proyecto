import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { auth } from "../components/Config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function WelcomeScreen({ navigation }: any) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  function login() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user)
        //console.log('accso correcto')
        setemail("");
        setpassword("");
        navigation.navigate("Tabs");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        //console.log('accseso denegado')
        setemail("");
        setpassword("");
        console.log(errorCode);
        console.log(errorMessage);
        switch (errorCode) {
          case "auth/invalid-email":
            Alert.alert("La dirección de correo electrónico no es válida.");
            break;
          case "auth/user-disabled":
            Alert.alert("La cuenta de usuario ha sido deshabilitada.");
            break;
          case "auth/user-not-found":
            Alert.alert("Usuario no registrado");
          case "auth/wrong-password":
            Alert.alert(
              "Credenciales incorrectas. Verifica tu correo y contraseña."
            );
            break;
          default:
            Alert.alert(
              "Ocurrió un error durante el inicio de sesión:",
              errorMessage
            );
        }
      });
  }
  return (
    <ImageBackground
      source={require("../assets/campo1.jpeg")}
      style={styles.backgroundImage}
    >
    <View style={styles.container}>
      <Image source={require("../assets/logo1-PhotoRoom.png-PhotoRoom.png")}
      style={styles.logo}/>
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={email}
        onChangeText={(text) => setemail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={(text) => setpassword(text)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.boton} onPress={() => login()}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate("Usuario")}
      >
        <Text style={styles.text}>Crear Usuario</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  titulo: {
    fontSize: 60,
    marginBottom: 10,
    color: "white",
  },

  input: {
    height: 40,
    borderColor: "white", 
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    paddingRight: 8,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)", 
    borderRadius:15
  },

  boton: {
    backgroundColor: "#ffb402", 
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    
    
    
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", 
    justifyContent: "center",
  },
  logo: {
    width: 500, 
    height: 200, 
    marginBottom: 20, 
  },
  text: {
    fontSize:15,
    marginBottom: 5,
    color:'black',
    fontWeight:"bold",
    textShadowColor: '#fffb88',
    textShadowOffset: { width: 1, height: 1 }, 
    textShadowRadius: 2,
  },
});
