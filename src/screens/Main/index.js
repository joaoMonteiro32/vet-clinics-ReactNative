import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Linking, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from '@expo/vector-icons';
import { calendar, logouting, reloaded } from "../../services/firebase.js";
import 'firebase/firestore';
let clinicaservico;
let clinica = {}
let selectedDate = new Date();
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app, usering, servicocalendar } from "../../services/firebase.js";

const storage = getStorage(app);
let url;

const Main = ({ navigation,route }) => {

  useEffect(() => {
    if( route.params.do=="logout"){
    logouting();
    navigation.navigate("Pagina Principal",{ do: "nothing" });}
    
    loadImage();
    },[route]);
  const [telefone, setTelefone] = useState(null);
  const [nome, setNome] = useState(null);
  const [Coordenada, setCoordenada] = useState(null);
  const [mail, setEmail] = useState(null);
  const [image, setImage] = useState(null);

  setInterval(() => {
    if (reloaded("Main") == 1) {
      clinica = calendar(selectedDate.getDate(), selectedDate.getMonth(), selectedDate.getFullYear());
      clinicaservico = clinica.id;
      setNome(clinica.data.nome);
      setTelefone(clinica.data.telefone);
      setCoordenada(clinica.data.Coordenadas);
      setEmail(clinica.data.email);

      loadImage();
    }
  }, 500);

  const ligar = () => {

    if (telefone) {
      const numeroTelefone = String(telefone);
      if (Linking.canOpenURL(`tel:${numeroTelefone}`)) {
        Linking.openURL(`tel:${numeroTelefone}`);
      } else {
        Alert.alert('Erro', 'Não é possível abrir o discador de telefone');
      }
    } else {
      Alert.alert('Erro', 'Número de telefone não disponível');
    }
  };

  const abrirMapa = () => {
    if (Coordenada) {
      const Maps = 'https://www.google.com/maps/search/?api=1&query=' + Coordenada.latitude + ',' + Coordenada.longitude;
      if (Linking.canOpenURL(Maps)) {
        Linking.openURL(Maps);
      } else {
        Alert.alert('Erro', 'Não é possível abrir o Maps');
      }
    } else {
      Alert.alert('Erro', 'Localizacao Incompativel');
    }
  };

  function enviarEmail() {
    if (mail) {
      const url = `mailto:${mail}`;
      Linking.openURL(url);
    } else {
      alert('Email não encontrado');
    }
  }

  const loadImage = async () => {
    clinica = servicocalendar();
    let iddatuamae = clinica.id;
    console.log(clinicaservico);
    const storageRef = ref(storage, `${iddatuamae}.png`); // Path to the image in Firebase Storage
    url = await getDownloadURL(storageRef);
    console.log("loading");
    setImage(url);
    console.log("loaded");
  };

  return (

    <View style={styles.container}>
      <View style={styles.header}>
      </View>
      <Text style={styles.title}>Clínica Veterinária de Serviço</Text>
      <View style={styles.card}>
        <LinearGradient
          colors={["white", '#0BB3FD', '#0CA1E7', '#0F87C8', '#125A8E']}
          start={{ x: 0.1, y: 0.5 }}
          end={{ x: 0.4, y: 0.9 }}
          locations={[0.1, 0.1, 0.3, 0.5, 1]}
          style={styles.gradient}
        />
        <TouchableOpacity
          style={styles.cardButton}
          onPress={() => {
            console.log(clinicaservico);
            navigation.navigate('Clinica De Servico', { docid: clinicaservico });

          }}
        >
          <MaterialIcons name="info" size={40} color="black" />
        </TouchableOpacity>
        <Image
          source={require("../../assets/images/veticon.png")}
          style={styles.cardTopRightImage} />
        <View style={styles.cardContent}>
          <View style={styles.ellipseImage}></View>
          <View style={styles.ellipseImage2}></View>
          <Image
            source={image ? { uri: image } : require("../../assets/images/bichos.png")}
            style={{ width: '81%', height: '54%', borderRadius: 50, bottom: "9%" }} // definindo a largura, altura e borderRadius
            resizeMode='cover' // garantindo que a imagem seja redimensionada para preencher o espaço disponível, mantendo sua proporção (aspect ratio).
          />
          <Text style={styles.title2}>{nome}</Text>
        </View>
        <View style={styles.cardButtons}>
          <View style={styles.botoes}>
            <View style={styles.ellipseTelefone}>
              <TouchableOpacity style={styles.innerButton} onPress={ligar}>
                <Image source={require("../../assets/images/telefone.png")} />
              </TouchableOpacity>
            </View>
            <View style={styles.ellipseLocalizacao}>
              <TouchableOpacity style={styles.innerButton} onPress={abrirMapa} >
                <Image source={require("../../assets/images/localizacao.png")} />
              </TouchableOpacity>
            </View>
            <View style={styles.ellipseEmail}>
              <TouchableOpacity style={styles.innerButton} onPress={enviarEmail}>
                <Image source={require("../../assets/images/email.png")} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  //5=1.5%
  title2: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: '4.5%',
    paddingLeft: '1.5%',
    color: 'white',
    top: -10,
  },
  botoes: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F5DC",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "6%",
    marginBottom: "3%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "3%",
  },
  card: {
    margin: "6%",
    marginTop: "12%",
    backgroundColor: "blue",
    borderRadius: 50,
    overflow: "hidden",
    height: "70%",
  },
  gradient: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 1,
  },
  cardButton: {
    marginLeft: "83%",
    marginTop: "5.5%",
  },
  cardTopRightImage: {
    width: 80,
    height: 80,
    marginLeft: 20,
    position: 'absolute',
    top: 20,
  },
  cardContent: {
    alignItems: "center",
    justifyContent: "center",
    padding: "30.5%",
    paddingTop: "12.15%",
    marginTop: "16.5%",
  },
  ellipseImage: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#0AB9FD",
    top: "22%",
  },
  ellipseImage2: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: "#FFF",
    top: "33%",
  },
  cardButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    bottom: 29,
  },
  ellipseButton: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  ellipseTelefone: {
    position: "absolute",
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    left: "68%",
    top: -30
  },
  ellipseLocalizacao: {
    position: "absolute",
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "white",
    overflow: "hidden",
    left: "44%",
    top: -100,
  },
  ellipseEmail: {
    position: "absolute",
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    left: "20%",
    top: -30
  },
  innerButton: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",

  },
});

export default Main;
