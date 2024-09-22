import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { QueryOrderByConstraint, doc, getDoc } from "firebase/firestore";
import { allclinicaspendentes, alterarEstadoAprovado, alterarEstadoRecusado, iniclin } from "../../../services/firebase";
let clinicasPendentes = [];
const GerirCandidaturas = ({ route }) => {
  const [clinicas, setClinicas] = useState([]);
  const [currentDocIndex, setCurrentDocIndex] = useState(0); // Índice do documento atualmente exibido

  useEffect(() => {
    setClinicas(allclinicaspendentes())
  }, [route]);

  const anterior = () => {
    if (currentDocIndex > 0) {
      setCurrentDocIndex(currentDocIndex - 1);
    }
    console.log(currentDocIndex);
  };

  const seguinte = () => {
    if (currentDocIndex < clinicas.length - 1) {
      setCurrentDocIndex(currentDocIndex + 1);
    }
    console.log(currentDocIndex);
  };

  const currentClinica = clinicas[currentDocIndex];
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {currentClinica && (
        <View style={styles.container2}>
          <View style={styles.headerContainer}></View>
          <View style={styles.elipseContainer}>
            <View style={styles.elipse}>
              <Image
                style={styles.imagemElipse}
                source={require("../../../assets/images/bichos.png")}
              />
            </View>
            <Text style={styles.titulo}>{currentClinica.data.nome}</Text>
            <Text style={styles.quantidade}>
              {currentDocIndex + 1}/{clinicas.length}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.phoneContainer}>
              <Text style={styles.infoText}>Telefone</Text>
              <Text style={styles.infoText}>
                {currentClinica.data.telefone}
              </Text>
            </View>

            <View style={styles.separator} />
            <View style={styles.phoneContainer}>
              <Text style={styles.infoText}>Morada: </Text>
              <Text style={styles.infoText}>{currentClinica.data.morada}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.phoneContainer}>
              <Text style={styles.infoText}>Email: </Text>
              <Text style={styles.infoText}>{currentClinica.data.email}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.phoneContainer}>
              <Text style={styles.infoText}>Latitude:</Text>
              <Text style={styles.infoText}>
                {currentClinica.data.latitude}
              </Text>
            </View>
            <View style={styles.phoneContainer}>
              <Text style={styles.infoText}>Altitude:</Text>
              <Text style={styles.infoText}>
                {currentClinica.data.longitude}
              </Text>
            </View>
          </View>
        </View>
      )}

{clinicas.length > 0 && (
        <View>
            <View style={styles.footerNavContainer}>
                <TouchableOpacity
                    style={styles.botaofrente}
                    onPress={anterior}
                    disabled={currentDocIndex === 0}
                >
                    <AntDesign name="left" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.botaotras}
                    onPress={seguinte}
                    disabled={currentDocIndex === clinicas.length - 1}
                >
                    <AntDesign name="right" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.footerContainer2}>
                <TouchableOpacity style={styles.iconLikeContainer} onPress={()=>alterarEstadoAprovado(currentClinica.data.nome)}>
                    <AntDesign name="like2" size={80} color="green" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconDislikeContainer} onPress={()=>alterarEstadoRecusado(currentClinica.data.nome)}>
                    <AntDesign name="dislike2" size={80} color="red" />
                </TouchableOpacity>
            </View>
        </View>
    )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  quantidade: {
    fontSize: 16,
    fontWeight: 800,
  },
  titulo: {
    fontSize: 25,
  },
  container2: {
    width: "100%",
    justifyContent: "center",
    marginLeft: "15%",
  },
  footerNavContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    top: "50%",
  },
  footerContainer2: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    width: "70%",
    paddingBottom: 10,
    paddingTop: 25,
  },
  iconLikeContainer: {
    alignItems: "center",
  },
  iconDislikeContainer: {
    alignItems: "center",
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
    padding: 5,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 0,
    position: "relative",
  },
  iconContainer: {
    flexDirection: "row",
    position: "absolute",
    top: -120,
    right: 10,
  },
  icon: {
    marginRight: 0,
  },
  icons: {
    marginTop: 3,
    marginRight: 10,
  },
  elipseContainer: {
    width: "80%",
    alignItems: "center",
    position: "relative",
    marginBottom: -60,
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
  iconContainer: {
    flexDirection: "row",
    position: "absolute",
    top: -130,
    right: 10,
  },
  icon: {
    marginRight: 0,
  },
  icons: {
    marginTop: 3,
    marginRight: 10,
  },
});

export default GerirCandidaturas;
