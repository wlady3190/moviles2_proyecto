import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import {
  getDatabase,
  ref,
  set,
  onValue,
  update,
  remove,
} from "firebase/database";
// import { getDatabase, ref, onValue } from "firebase/database";
import { db } from "../components/Config";

export default function UsuarioScreen() {
  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [form, setForm] = useState({});
  const [lista, setLista] = useState([]);

  function guardar(cedula: string, nombre: string, ciudad: string) {
    // const db = getDatabase();
    set(ref(db, "usuarios/" + cedula), {
      username: nombre,
      city: ciudad,
    });
    setCedula("");
    setCiudad("");
    setNombre("");
  }
  // LEER
  function leer() {
    // const db = getDatabase();
    const starCountRef = ref(db, "usuarios/");
    onValue(starCountRef, (snapshot) => {
      const data: any = snapshot.val();
      let dataArray: any = Object.keys(data).map((key) => ({
        key,
        ...data[key],
      }));
      setLista(dataArray);
      console.log(dataArray);

      // updateStarCount(postElement, data);
    });
  }

  useEffect(() => {
    leer();
    console.log(lista);
  }, []);

  function actualizar(cedula: string, username: string, ciudad: string) {
    update(ref(db, "usuarios/" + cedula), {
      username: nombre,
      city: ciudad,
    });
  }

  // ELIMINAR

  function eliminar(cedula: string) {
    remove(ref(db, "usuarios/" + cedula));
  }

  type Item = {
    key: string;
    username: string;
    city: string;
  };

  return (
    <View style={styles.container}>
      <Text>Registro de usuarios</Text>
      <TextInput
        style={styles.input}
        placeholder="Cedula"
        onChangeText={(texto) => setCedula(texto)}
        value={cedula}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        onChangeText={(texto) => setNombre(texto)}
        value={nombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Ciudad"
        onChangeText={(texto) => setCiudad(texto)}
        value={ciudad}
      />
      <View style={styles.fila}>
        <Button
          title="Guardar"
          onPress={() => guardar(cedula, nombre, ciudad)}
        />
        <Button title="Leer" onPress={() => leer()} />
      </View>

      <View style={styles.fila}>
        <TextInput
          style={styles.input2}
          placeholder="Cedula"
          onChangeText={(texto) => setCedula(texto)}
          value={cedula}
        />
        <TextInput
          style={styles.input2}
          placeholder="Nombre"
          onChangeText={(texto) => setNombre(texto)}
          value={nombre}
        />
        <TextInput
          style={styles.input2}
          placeholder="Ciudad"
          onChangeText={(texto) => setCiudad(texto)}
          value={ciudad}
        />
      </View>
      <Button
        title="Actualizar"
        onPress={() => actualizar(cedula, nombre, ciudad)}
      />

      <View style={styles.fila}>
        <TextInput
          style={styles.input2}
          placeholder="Cedula"
          onChangeText={(texto) => setCedula(texto)}
          // value={cedula}
        />
        <Button title="eliminar" onPress={() => eliminar(cedula)} color='red'/>
      </View>
      <FlatList
        data={lista}
        renderItem={({ item }: { item: Item }) => (
          <View>
            <Text>
              {item.key} || {item.username}
            </Text>
            {/* <Text >{item.city}</Text>      */}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:'#ccc'
  },
  input: {
    borderWidth: 1,
    height: 35,
    width: "80%",
    margin: 4,
    borderRadius: 30,
    paddingHorizontal: 20,
    borderColor: "black",
  },
  input2: {
    borderWidth: 1,
    height: 35,
    width: "30%",
    margin: 4,
    borderRadius: 30,
    paddingHorizontal: 20,
    borderColor: "black",
  },
  fila: {
    flexDirection: "row",
    marginHorizontal: 20,
  },
});
