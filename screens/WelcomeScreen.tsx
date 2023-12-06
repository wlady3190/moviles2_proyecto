import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'

export default function WelcomeScreen({navigation}: any) {
  return (
    <View>
      <TextInput placeholder='Usuario'/>
      <TextInput placeholder='contraseña'/>
      <TouchableOpacity>
        <Text>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({})