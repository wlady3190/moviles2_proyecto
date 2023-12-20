import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground

} from "react-native";
import React, { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { TextInput } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import {
  getStorage,
  ref as refImage,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import {
  getDatabase,
  ref as refStorage,
  set,
  onValue,
  update,
  remove,
} from "firebase/database";
// import { getDatabase, ref, onValue } from "firebase/database";
import { auth, db, storage } from "../components/Config";

// import { getDatabase, ref, set } from "firebase/database";

export default function UsuarioScreen({ navigation }: any) {
  const [correo, setCorreo] = useState("");
  const [usuario, setUsuario] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [contrasena, setContrasena] = useState("");
  const [contrasena2, setContrasena2] = useState("");

  async function crearUsuario(
    correo: string,
    username: string,
    contrasenia: string
  ) {
    if (contrasena === contrasena2) {
      //subir imagen

      const storageRef = refImage(storage, "test/imagen-" + username);

      const response = await fetch(image);
      const blob = await response.blob();

      try {
        await uploadBytes(storageRef, blob, { contentType: "image/jpg" });
        Alert.alert("La imagen se subió con éxito");
        setImage("");

        //Obtiene la URL de la imagen
        const imageURL = await getDownloadURL(storageRef);
        console.log("URL de descarga de la imagen", imageURL);
        // setImageUrl(imageURL);
        //Guardando en la DB
        set(refStorage(db, "users/" + username), {
          email: correo,
          username: username,
          url: imageURL, //Usestate
          score:0
        });
      } catch (error) {
        console.log(error);
      }

      //AUTENTIFICACIÓN
      createUserWithEmailAndPassword(auth, correo, contrasenia)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Usuario registrado OK");
          Alert.alert("Datos registrados");
          navigation.navigate("WELCOME");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode);
          setCorreo("");
          setContrasena("");

          switch (errorCode) {
            case "auth/missing-password":
              Alert.alert("Error", "No puede enviar una contraseña vacía");
              break;
            case "auth/invalid-email":
              Alert.alert("Error", "Correo inválido");
              break;
            case "auth/email-already-in-use":
              Alert.alert("Error", "Correo ya registrado");
            default:
              Alert.alert("Error", "Error en las credenciales");
              break;
          }
        });
      setCorreo("");
      setUsuario("");
      setContrasena("");
      setContrasena2("");
    } else {
      Alert.alert("Error", "Las contraseñas no coinciden");
    }
  }
  // carga de imagen
  const pickImageAsync = async () => {
    //IMAGEN
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
        console.log(result);
        setImage(result.assets[0].uri);
      } else {
        alert("La estructura del resultado de la imagen no es la esperada.");
      }
    } else {
      alert("No seleccionaste ninguna imagen.");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/fondo3.jpeg")}
      style={styles.backgroundImage}
    >
    <View style={styles.container}>
      

      
      <Image source={require("../assets/logo1-PhotoRoom.png-PhotoRoom.png")}
      style={styles.logo}/>
      <Text style={styles.titulo}>REGISTRO</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electronico"
        onChangeText={(texto) => setCorreo(texto)}
        value={correo}
        keyboardType="email-address"
        
      />
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        onChangeText={(texto) => setUsuario(texto)}
        value={usuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        onChangeText={(texto) => setContrasena(texto)}
        value={contrasena}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        onChangeText={(texto) => setContrasena2(texto)}
        value={contrasena2}
        secureTextEntry={true}
      />
      
      <TouchableOpacity
      onPress={() => pickImageAsync()}>
        <Image  source={require("../assets/panel.png")}
        style={styles.img}/>
       <View style={styles.overlay}>
      <Text style={styles.buttonText}>Cargar Imagen</Text>
    </View>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={() => crearUsuario(correo, usuario, contrasena)}>
        <Image  source={require("../assets/panel.png")}
        style={styles.img}/>
       <View style={styles.overlay}>
      <Text style={styles.buttonText}>Crear Usuario</Text>
    </View>
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

   
  },
  fila: {
    flexDirection: "row",
    marginHorizontal: 20,
  },
 
  titulo: {
    fontSize:70,
    marginBottom: 10,
    color:'#ffb402',
    fontWeight:"bold",
    textShadowColor: '#fffb88',
    textShadowOffset: { width: 3, height: 5 }, 
    textShadowRadius: 2,
  },
  
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", 
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "white", 
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    paddingRight: 8,
    width: "70%",
    backgroundColor: "rgba(255, 255, 255, 0.8)", 
    borderRadius:15
  },

  boton: {
    backgroundColor: "#ffb402", 
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  logo: {
    width: 400, 
    height: 220, 
   
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
    img:{
      height:100,
      width:150,
      resizeMode: 'cover',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 15,
      color: 'white',
      fontWeight:"bold",
    },
  
});
