// Card.js
import React from 'react';
import { View, Text, StyleSheet,ImageBackground } from 'react-native';

interface CardProps {
    email: string;
    score: number;
  }

const Card: React.FC<CardProps>= ({ email, score }) => (

    <ImageBackground
    source={require("../assets/panel.png")}
    style={styles.backgroundImage}>
  
  <View style={styles.card}>

    <Text style={styles.text}>User: {email}</Text>
    <Text style={styles.text}>Score: {score}</Text>
  </View>
  </ImageBackground>
);

const styles = StyleSheet.create({
  card: {
    
    padding: 25,
    marginVertical: -10,
    borderRadius: 8,
    alignSelf:'center',
    justifyContent:'center',
    gap:-10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: 'gray',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    fontSize:15,
    marginBottom: 10,
    color:'white',
    fontWeight:"bold",
    
  },
});

export default Card;
