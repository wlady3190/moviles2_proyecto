import { StyleSheet, Text, View,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import {db} from '../components/Config'
import { getDatabase, ref, set, onValue, update, remove } from 'firebase/database'


export default function PerfilScreen() {
    const [usuarios, setUsuarios] = useState([])
    //////////LEER
  function leer() {
    const starCountRef = ref(db, 'users/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
  
      let dataArray:any=Object.keys(data).map(key =>({key,...data[key]}))
      setUsuarios(dataArray)
      console.log(usuarios)

    });
  }
  useEffect(() => {
    leer()

  }, [])

  return (
    <View>
      <Text>Perfil</Text>
      <Text>User: </Text>
      <Text>Correo: </Text>
      <Text>Score: </Text>
      
      
    </View>
  )
}

const styles = StyleSheet.create({})