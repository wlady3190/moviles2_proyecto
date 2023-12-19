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
    
    padding: 16,
    margin: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    color:'black',
    fontWeight:"bold",
    textShadowColor: '#fffb88',
    textShadowOffset: { width: 1, height: 1 }, 
    textShadowRadius: 2,
  },
});

export default Card;
