import { Button, FlatList, StyleSheet, Text, View,ImageBackground,Image,TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import {auth, db } from "../components/Config";
import {
  getDatabase,
  ref,
  set,
  onValue,
  update,
  remove,
} from "firebase/database";
import Card from '../components/Card'; 

const ScoreScreen = () => {
  const [usuarios, setUsuarios] = useState([])
  type item={
    key:string,
    url: string,
    email: string,
    score: number
  }

  function leer() {
  
    const starCountRef = ref(db, 'users/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
  
      let dataArray:any=Object.keys(data).map(key =>({key,...data[key]}))
      setUsuarios(dataArray)    
    });
  
  }
  
  useEffect(() => {
    leer()
  }, [])
  return (
    <ImageBackground
    source={require("../assets/campo1.jpeg")}
    style={styles.backgroundImage}>

    <View style={styles.container}>
      
      <Text style={styles.titulo}>SCOREBOARD</Text>
      <TouchableOpacity
      style={styles.boton}
      onPress={()=>leer()}>
        <Text style={styles.text}>Recargar</Text>
      </TouchableOpacity>
      <FlatList
        data={usuarios}
        renderItem={({item})=>(
         
          <View >
         
          <Card
              email={item.key}
              score={item.score}
            />
          
          </View>
        )}
      />
      
    </View>
    </ImageBackground>
  )
}

export default ScoreScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", 
    justifyContent: "center",
  },
 
  titulo: {
    fontSize:50,
    marginBottom: 10,
    color:'#ffb402',
    fontWeight:"bold",
    textShadowColor: '#fffb88',
    textShadowOffset: { width: 3, height: 5 }, 
    textShadowRadius: 2,
  },
  boton: {
    backgroundColor: "#ffb402", // Gris con opacidad para que se vea bien sobre el césped.
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
   
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
 
})