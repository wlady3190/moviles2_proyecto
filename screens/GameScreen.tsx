import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const GameScreen = () => {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(10); // Tiempo en segundos
  const [isRunning, setIsRunning] = useState(true);
  const [duckPosition, setDuckPosition] = useState({ x: 0, y: 0 });
  const windowWidth = Dimensions.get('window').width;

  useEffect(() => {
    if (time > 0 && isRunning) {
      const timer = setTimeout(() => {
        // Mueve el pato a una posición aleatoria en el ancho de la pantalla
        const newX = Math.floor(Math.random() * windowWidth);
        setDuckPosition({ x: newX, y: 0 });

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
    <View style={styles.container}>
      <Text style={styles.scoreText}>Puntuación: {score}</Text>
      <Text style={styles.timeText}>Tiempo restante: {time}s</Text>
      <TouchableOpacity
        style={[styles.duck, { left: duckPosition.x, top: duckPosition.y }]}
        onPress={handleDuckPress}
      >
        {/* Coloca aquí la imagen del pato */}
        <Text style={styles.duckText}>🦆</Text>
      </TouchableOpacity>
      {!isRunning && (
        <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
          <Text style={styles.restartButtonText}>Reiniciar Juego</Text>
        </TouchableOpacity>
      )}
    </View>
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
    backgroundColor: 'lightblue',
    padding: 20,
    borderRadius: 50,
  },
  duckText: {
    fontSize: 30,
  },
  restartButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  restartButtonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default GameScreen;
