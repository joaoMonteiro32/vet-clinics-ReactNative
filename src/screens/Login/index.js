import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";

import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  signOut,
  signInWithEmailAndPassword ,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

import { app,logining } from "../../services/firebase.js";

const LoginPage = ({route, navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { itemId } = route.params;

  async function signIn() {
    try {
      // Check if the fields are not empty
      if (email === '' || password === '') {
        alert('Por favor, preencha todos os campos.');
        return;
      }
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      console.log("logado com sucesso");
      logining(auth.currentUser.uid);
      navigation.navigate("Pagina Principal");
    } catch (error) {
      // If there is an error while signing in, show an alert
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        alert('Email ou senha incorretos.');
      } else {
        alert('Erro ao fazer login: ' + error.message);
      }
      console.error("Error signing in: ", error);
    }
  }

  // async function handleSignOut() {
  //   try {

  //   } catch (error) {
  //     console.error("Error signing out: ", error);
  //   }
  // }

  const handleLogin = ()=> {
    signIn();
  };
  const handleLogout = () =>  {
    handleSignOut();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.patinhas}
          source={require("../../assets/images/suv.png")}
        />
      </View>
      <View style={styles.elipse}>
        <Image
          style={styles.imagemElipse}
          source={require("../../assets/images/cao.png")}
        />
      </View>
      <Text style={styles.titulo}>Log in</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.textoBotao}>Entrar</Text>
        <Image
          style={styles.patinhas}
          source={require("../../assets/images/patinhas.png")}
        />
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.botao} onPress={handleLogout}>
        <Text style={styles.textoBotao}>Sair</Text>
        <Image
          style={styles.patinhas}
          source={require("../../assets/images/patinhas.png")}
        />
      </TouchableOpacity> */}
      <Text style={styles.textoConta}>Se já possui uma conta clique aqui</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  patinhas: {
    marginLeft: 5,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5DC",
    padding: 10,
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    paddingTop: 20,
  },
  subHeader: {
    fontSize: 18,
    color: "#3CC4E2",
    fontWeight: "bold",
    marginBottom: 30,
  },
  titulo: {
    fontSize: 38,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    fontWeight: "bold",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  botao: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#3CC4E2",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    alignItems: "center",
  },
  textoBotao: {
    color: "#FFF",
    fontSize: 16,
  },
  textoConta: {
    color: "#3CC4E2",
    fontSize: 16,
    paddingTop: 20,
  },
  elipse: {
    position: "absolute",
    top: -30,
    right: 0,
    backgroundColor: "#F3D75C",
    borderBottomLeftRadius: 300,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 190,
    borderTopRightRadius: 20,
    width: 230,
    height: 280,
    justifyContent: "center",
    alignItems: "center",
  },
  imagemElipse: {
    marginBottom: 10,
    marginLeft: 40,
  },
});

export default LoginPage;





