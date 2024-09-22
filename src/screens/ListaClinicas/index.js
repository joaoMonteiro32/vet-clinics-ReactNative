import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  FlatList,
  Linking,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Octicons } from "@expo/vector-icons";
import {
  collection,
  query,
  getDoc,
  doc,
  getFirestore,
  firestore,
  getDocs,
} from "firebase/firestore";
import { app,allclinicas,reloaded } from "../../services/firebase.js";
import { Directions } from "react-native-gesture-handler";



const ListaClinicas = ({ route, navigation }) => {
  useEffect(() => {
    setclinicas(allclinicas());

},[route]);
    const [clinicas,setclinicas]=useState([]);

    
  setInterval(() => {
    if(reloaded("Lista de Clinica")==1){
      setclinicas(allclinicas());
    }
    }, 50);

    const renderItem = ({ item }) => {
        return (
          <TouchableOpacity onPress={() => navigation.navigate("Informacao Clinica", {docid: item.id})}>
            <View style={styles.listItem}>
              <Image source={require("../../assets/images/bichos.png")} style={styles.clinicaImage} />
              <View style={styles.clinicaInfo}>
                <Text style={styles.clinicaNome}>{item.data.nome}</Text>
                <Text style={styles.clinicaTelefone}>Telefone: {item.data.telefone}</Text>
                <Text style={styles.clinicaMorada}>
                  Morada: {item.data.morada}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      };
  return (
    <FlatList
      data={clinicas}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: "#F5F5DC",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  clinicaImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  clinicaInfo: {
    flex: 1,
  },
  clinicaNome: {
    fontSize: 18,
    fontWeight: "bold",
  },
  clinicaTelefone: {
    fontSize: 16,
  },
  clinicaMorada: {
    fontSize: 16,
  },
});


export default ListaClinicas;
