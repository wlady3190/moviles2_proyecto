import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
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
    <View>
      <Text>ScoreScreen</Text>
      <FlatList
        data={usuarios}
        renderItem={({item})=>(
          <View >
          <Text>{item.key} {item.score}</Text>
          
          </View>
        )}
      />
      
      <Button title='recargar' onPress={()=>leer()}/>
    </View>
  )
}

export default ScoreScreen

const styles = StyleSheet.create({})