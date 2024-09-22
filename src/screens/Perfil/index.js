import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Text, Image, Button } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { collection, getFirestore, doc, query, where, getDoc } from "firebase/firestore";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { app,buscar } from "../../services/firebase.js";
import { getStorage, ref, uploadBytes,getDownloadURL } from 'firebase/storage';
import { usuario } from "../Login/index.js";


const storage = getStorage(app);

let clinica =[];
const Perfil = ({route}) => {
    clinica=buscar(route.params.docid);
    const [image, setImage] = useState(null);

    useEffect(() => {
      const loadImage = async () => {
          const storageRef = ref(storage, `${route.params.docid}.png`); // Path to the image in Firebase Storage
          url = await getDownloadURL(storageRef);
          console.log("loading");
          setImage(url);
          console.log("loaded");
      };
      loadImage();
    }, [route]);
  return (
    
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}></View>
      <View style={styles.elipseContainer}>
        <View style={styles.elipse}>
          <Image
            style={styles.imagemElipse}
            source={image ? { uri: image } : require("../../assets/images/bichos.png")}
          />
        </View>
        {/* <Text>itemId: {JSON.stringify(itemId)}</Text> */}
        {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
        <Text style={styles.title}>{clinica.data.nome}</Text>
        {/* <Button title="Isto é apenas um Teste" onPress={buscarInfo} /> */}
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.phoneContainer}>
          <Text style={styles.infoText}>Telefone:</Text>
          <Text style={styles.infoText}>{clinica.data.telefone}</Text>
        </View>

        <View style={styles.separator} />
        <View style={styles.phoneContainer}>
          <Text style={styles.infoText}>Morada: </Text>
          <Text style={styles.infoText}>{clinica.data.morada}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.phoneContainer}>
          <Text style={styles.infoText}>Email: </Text>
          <Text style={styles.infoText}>{clinica.data.email}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.phoneContainer}>
          <Text style={styles.infoText}>Latitude:</Text>
          <Text style={styles.infoText}>{clinica.data.Coordenadas.latitude}</Text>
        </View>
        <View style={styles.phoneContainer}>
          <Text style={styles.infoText}>Longitude:</Text>
          <Text style={styles.infoText}>{clinica.data.Coordenadas.longitude}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  phoneContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5DC",
    padding: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: -70,
    position: "relative",
  },
  elipseContainer: {
    width: "80%",
    alignItems: "center",
    position: "relative",
    marginBottom: -80,
    zIndex: 1,
  },
  elipse: {
    backgroundColor: "white",
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  imagemElipse: {
    width: 90,
    height: 90,
    borderRadius:50,
  },
  infoContainer: {
    backgroundColor: "white",
    width: "85%",
    height: 350,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    paddingTop: 70,
    borderRadius: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
  },
  infoText: {
    fontSize: 16,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#D6D6D6",
    marginVertical: 10,
  },
});

export default Perfil;
