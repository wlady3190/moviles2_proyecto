import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'

export default function WelcomeScreen({navigation}: any) {
  return (
    <View style={styles.container}>
       <Text style={styles.titulo}>Bienvenidos!</Text>
      <TextInput style={styles.input} placeholder='Usuario'/>
      <TextInput style={styles.input} placeholder='contraseña'/>
      <TouchableOpacity style={styles.boton}>
        <Text>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.boton}>
        <Text>
          Crear Usuario
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
},
titulo: {
    fontSize: 60,
    marginBottom: 10,
},
input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    paddingRight: 8,
    width: '100%',
   
},
boton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginBottom:10

}
})