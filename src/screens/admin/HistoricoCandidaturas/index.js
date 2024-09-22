import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { allcandidaturas, allclinicas, allclinicaspendentes } from "../../../services/firebase";
import { useState } from "react";
import { useEffect } from "react";

const HistoricoCandidaturas = ({route}) => {
  let clin=allclinicaspendentes();
  const [clinicas,setclinicas]=useState(allclinicaspendentes());
  
  useEffect(() => {
    setclinicas(allclinicaspendentes());
  },[route]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.data.nome}</Text>
          <View style={styles.statusContainer}>
            <Icon name={item.data.estado=="pendente"?"time-outline":item.data.estado=="executado"?"checkmark-outline":"close-outline"} size={25} color={item.data.estado=="pendente"?"#FFA500":item.data.estado=="executado"?"green":"red"} />
            <Text style={styles.statusText}>{item.data.estado}</Text>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.infoText}><Text style={styles.label}>Telefone:</Text> {item.data.telefone}</Text>
          <Text style={styles.infoText}><Text style={styles.label}>Morada: </Text> {item.data.morada}</Text>
          <Text style={styles.infoText}><Text style={styles.label}>Email: </Text> {item.data.email}</Text>
          <Text style={styles.infoText}><Text style={styles.label}>Latitude:</Text> {item.data.latitude}</Text>
          <Text style={styles.infoText}><Text style={styles.label}>Altitude:</Text> {item.data.longitude}</Text>
        </View>
      </View>
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
  listItem: {
    width:"65%",
    alignItems: "flex-start",
    marginBottom: 20,
    marginTop: 30,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    left: "30%"
  },
  statusText: {
    fontSize: 18,
    marginLeft: 8,
  },
  detailsContainer: {
    marginTop: 10,
    width: "100%"
  },
  infoText: {
    fontSize: 16,
    width: "130%"
  },
  label: {
    fontWeight: "bold",
  },
  container: {
    flexGrow: 1,
    
    alignItems: "center",
    backgroundColor: "#F5F5DC",
    padding: 2,
  },
});

export default HistoricoCandidaturas;
