import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
    <View style={styles.container}>
      <Text style={styles.titulo}>Bienvenidos!</Text>
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
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate("Usuario")}
      >
        <Text>Crear Usuario</Text>
      </TouchableOpacity>
    </View>
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
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    paddingRight: 8,
    width: "100%",
  },
  boton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});
