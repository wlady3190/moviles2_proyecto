import { StyleSheet, Text, View,Image, Button,ImageBackground,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {auth, db} from '../components/Config'
import { getDatabase, ref, set, onValue, update, remove } from 'firebase/database'
import { getAuth, signOut } from "firebase/auth";


export default function PerfilScreen({navigation}:any) {
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

    function singout(){
      signOut(auth).then(() => {
        console.log('se cerro sesion exitosamente')
        navigation.navigate('WELCOME')
        
        // Sign-out successful.
      }).catch((error) => {
        console.log('No cerro sesion exitosamente')
        // An error happened.
      });
      
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
    <ImageBackground
    source={require("../assets/fondo3.jpeg")}
    style={styles.backgroundImage}
  >
    <View style={styles.container}>
      <Image source={require("../assets/logo1-PhotoRoom.png-PhotoRoom.png")}
      style={styles.logo}/>
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

        <TouchableOpacity
      onPress={()=>leer()}>
        <Image  source={require("../assets/panel.png")}
        style={styles.img}/>
       <View style={styles.overlay}>
      <Text style={styles.buttonText}>Recargar</Text>
    </View>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={()=>singout()}>
        <Image  source={require("../assets/panel.png")}
        style={styles.img}/>
       <View style={styles.overlay}>
      <Text style={styles.buttonText}>Cerrar Sesion</Text>
    </View>
      </TouchableOpacity>
      </View>
    </View>
    </ImageBackground>
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
    width: 150,
    height: 150,
    borderRadius: 20,
    marginBottom: 10,
    borderWidth: 2, // 
    borderColor: 'black',
  },
  userInfo: {
    alignItems: 'center',
  },
  label: {
    fontSize: 28,
    fontWeight: 'bold',
   
    color:'white'
  },
  info: {
    fontSize: 16,
   
  },
  logo: {
    width: 300, 
    height: 150, 
  
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", 
    justifyContent: "center",
  },
  img:{
    height:90,
    width:140,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight:"bold",
  },
 
});