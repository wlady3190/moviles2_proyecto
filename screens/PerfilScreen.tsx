import { StyleSheet, Text, View,Image, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import {auth, db} from '../components/Config'
import { getDatabase, ref, set, onValue, update, remove } from 'firebase/database'


export default function PerfilScreen() {
    const [usuarios, setUsuarios] = useState([])
    const [url, seturl] = useState('')
    const [user, setuser] = useState('')
    const [correo, setcorreo] = useState('')
    const [score, setscore] = useState(0)
    type item={
      key:string,
      url: string,
      email: string,
      score: number

    }
    //////////LEER
  function leer() {
    const starCountRef = ref(db, 'users/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
  
      let dataArray:any=Object.keys(data).map(key =>({key,...data[key]}))
      setUsuarios(dataArray)
      console.log(usuarios)
      console.log(auth.currentUser?.email)
      for(let dato of usuarios){
        let item:item =dato
        
        if(item.email===auth.currentUser?.email){
          seturl(item.url)
          setuser(item.key)
          setcorreo(item.email)
          setscore(item.score)
          break

        }else{
          seturl('')
          setuser('')
          setcorreo('')
          setscore(0)
        }

      }

    });
  }
  useEffect(() => {
    leer()

  }, [])

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: url }}
        style={styles.profileImage}
      />
      <View style={styles.userInfo}>
        <Text style={styles.label}>User:{user}</Text>
        <Text style={styles.info}></Text>

        <Text style={styles.label}>Correo:{correo}</Text>
        <Text style={styles.info}></Text>

        <Text style={styles.label}>Score:{score}</Text>
        <Text style={styles.info}></Text>

        <Button title='recargar' onPress={()=>leer()}/>
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