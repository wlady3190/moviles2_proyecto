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
    <View style={styles.container}>
      <Image
        source={{ uri: 'URL_DE_TU_IMAGEN' }}
        style={styles.profileImage}
      />
      <View style={styles.userInfo}>
        <Text style={styles.label}>User:</Text>
        <Text style={styles.info}></Text>

        <Text style={styles.label}>Correo:</Text>
        <Text style={styles.info}></Text>

        <Text style={styles.label}>Score:</Text>
        <Text style={styles.info}></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 250,
    height: 250,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 2, // 
    borderColor: 'black',
  },
  userInfo: {
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    marginBottom: 15,
  },
});