import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground,Image } from 'react-native';


import {
    getDatabase,
    ref,
    set,
    onValue,
    update,
    remove,
  } from "firebase/database";
  // import { getDatabase, ref, onValue } from "firebase/database";
  import {auth, db } from "../components/Config";

const GameScreen = () => {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(10); // Tiempo en segundos
  const [isRunning, setIsRunning] = useState(true);
  const [duckPosition, setDuckPosition] = useState({ x: 0, y: 0 });
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const gameAreaWidth = windowWidth - 50; // Ajusta el tamaño de la región de juego
  const gameAreaHeight = windowHeight - 100;

  const [user, setuser] = useState('')
  const [score2, setScore2] = useState(0);
  const [usuarios, setUsuarios] = useState([])

  const getRandomPosition = () => {
    const newX = Math.floor(Math.random() * gameAreaWidth)
    const newY = Math.floor(Math.random() * gameAreaHeight);
    return { x: newX, y: newY };
  };

  type item={
    key:string,
    url: string,
    email: string,
    score: number

  }

//   function guardarScore(username: string, puntuacion:number) {
//       set(ref(db, "users/" + username), {
//         score:puntuacion
//       });
//   }
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
        setuser(item.key)
        setScore2(item.score)
        
        break

      }else{
        
      }

    }

  });
  if(score>score2){
    update(ref(db, "users/" + user), {
     
      score: score
    });

  }
}
  useEffect(() => {
    leer()

    if (time > 0 && isRunning) {
      const timer = setTimeout(() => {
        // Mueve el pato a una posición aleatoria en la pantalla
        setDuckPosition(getRandomPosition());

        setTime(time - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setIsRunning(false);
    }
  }, [time, isRunning]);

  const handleDuckPress = () => {
    if (isRunning) {
      setScore(score + 1);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setTime(10);
    setIsRunning(true);
  };

  return (
    <ImageBackground
    source={require("../assets/fondo-final.jpeg")}
    style={styles.backgroundImage}
  >

    <View style={styles.container}>
      <Text style={styles.text}>Puntuación: {score}</Text>
      <Text style={styles.text}>Tiempo restante: {time}s</Text>
      <TouchableOpacity
        style={[styles.duck, { left: duckPosition.x, top: duckPosition.y }]}
        onPress={handleDuckPress}
      >
        <Image source={require("../assets/cucarachapreview.png")}
        style={styles.img}/>
        
      </TouchableOpacity>
      {!isRunning && (
        <TouchableOpacity  onPress={handleRestart}>
           <Image  source={require("../assets/panel.png")}
        style={styles.img2}/>
          <View style={styles.overlay}>
      <Text style={styles.buttonText}>Reiniciar Juego</Text>

    </View>
        </TouchableOpacity>
        
      )}
         
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 20,
    marginBottom: 10,
  },
  timeText: {
    fontSize: 18,
    marginBottom: 20,
  },
  duck: {
    position: 'absolute',
   
  },
  duckText: {
    fontSize: 40,
  },
  restartButton: {
   
    padding: 10,
    borderRadius: 5,
    marginTop: 90,
  },
 
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", 
    justifyContent: "center",
  },
  text: {
    marginBottom: 10,
    color:'white',
    fontWeight:"bold",
   
    fontSize:20,
  },
  img:{
    width:100,
    height:100,
  },
  img2:{
    height:100,
    width:150,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
    fontWeight:"bold",
  },
});

export default GameScreen;
