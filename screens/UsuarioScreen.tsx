import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import {
  getDatabase,
  ref,
  set,
  onValue,
  update,
  remove,
} from "firebase/database";
// import { getDatabase, ref, onValue } from "firebase/database";
import { db } from "../components/Config";

export default function UsuarioScreen() {
  const [correo, setCorreo] = useState('')
  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [contrasena2, setContrasena2] = useState('')
 


  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro de usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electronico"
        onChangeText={(texto) => setCorreo(texto)}
        value={correo}
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
      />
       <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        onChangeText={(texto) => setContrasena2(texto)}
        value={contrasena2}
      />
      <View style={styles.boton}>
        <TouchableOpacity>
          <Text>Crear Usuario</Text>
        </TouchableOpacity>
     
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:'#ccc'
  },
  input: {
    borderWidth: 1,
    height: 35,
    width: "80%",
    margin: 4,
    borderRadius: 30,
    paddingHorizontal: 20,
    borderColor: "black",
  },
  input2: {
    borderWidth: 1,
    height: 35,
    width: "30%",
    margin: 4,
    borderRadius: 30,
    paddingHorizontal: 20,
    borderColor: "black",
  },
  fila: {
    flexDirection: "row",
    marginHorizontal: 20,
  },
  boton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginTop:20

},
titulo: {
  fontSize: 60,
  marginBottom: 10,
},
});
