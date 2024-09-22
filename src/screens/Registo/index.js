import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  collection,
  getFirestore,
  doc,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { adicionarClinicas } from "../../services/firebase";

const Registo = ({ route }) => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarpassword, setConfirmarPassword] = useState("");
  const [morada, setMorada] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const estado = "pendente";

  const onClear = () => {
    setNome("");
    setTelefone("");
    setEmail("");
    setPassword("");
    setMorada("");
    setLatitude("");
    setLongitude("");
    setConfirmarPassword("");
  };

  const tentar = () => {
    if (
      nome === "" ||
      telefone === "" ||
      email === "" ||
      morada === "" ||
      latitude === "" ||
      longitude === "" ||
      password === "" ||
      confirmarpassword === ""
    ) {
      alert("Por favor, preencha todos os campos antes de submeter a candidatura.");
    } else if (telefone.length !== 9) {
      alert("O telefone deve ter exatamente 9 dígitos. Por favor, verifique e tente novamente.");
    } else if (password !== confirmarpassword) {
      alert("As passwords não são iguais. Por favor, verifique e tente novamente.");
    } else {
      adicionarClinicas(
        nome,
        telefone,
        email,
        morada,
        latitude,
        longitude,
        password,
        confirmarpassword,
        estado
      );
    }
  };



  const combo = () => {
    onClear();
    tentar();
  };

  return (
    <ScrollView style={styles.scrollview}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.patinhas}
          source={require("../../assets/images/suv.png")}
        />
      </View>
      <View style={styles.elipse}>
        <Image
          style={styles.imagemElipse}
          source={require("../../assets/images/gato.png")}
        />
      </View>
      <View style={{ height: 100 }}></View>
      <View style={styles.container}>
        <Text style={styles.titulo}>Registo</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome Clinica"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone/Telemóvel"
          secureTextEntry
          value={telefone}
          onChangeText={setTelefone}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Morada"
          value={morada}
          onChangeText={setMorada}
        />
        <TextInput
          style={styles.input}
          placeholder="Latitude"
          value={latitude}
          onChangeText={setLatitude}
        />
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          // secureTextEntry
          value={longitude}
          onChangeText={setLongitude}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          // secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Password"
          // secureTextEntry
          value={confirmarpassword}
          onChangeText={setConfirmarPassword}
        />
        <TouchableOpacity style={styles.botao} onPress={() => combo()}>
          <Text style={styles.textoBotao}>Registar</Text>
          <Image
            style={styles.patinhas}
            source={require("../../assets/images/patinhas.png")}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  patinhas: {
    marginLeft: 5,
  },
  scrollview: {
    backgroundColor: "#F5F5DC",
  },
  textoConta: {
    color: "#007AFF",
    paddingTop: 5,
  },
  headerContainer: {
    paddingTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5DC",
  },
  imagem: {
    width: 100,
    height: 100,
    position: "absolute",
    top: 0,
    right: 0,
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    fontWeight: "bold",
    borderColor: "#4E4D4D",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  botao: {
    flexDirection: "row",
    backgroundColor: "#3CC4E2",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    width: "40%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  textoBotao: {
    color: "#FFF",
    fontSize: 20,
    paddingLeft: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#3CC4E2",
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#3CC4E2",
  },
  elipse: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#F3D75C",
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    width: 190,
    height: 190,
    justifyContent: "center",
    alignItems: "center",
  },
  imagemElipse: {
    marginBottom: 20,
    marginLeft: 40,
  },
});

export default Registo;
