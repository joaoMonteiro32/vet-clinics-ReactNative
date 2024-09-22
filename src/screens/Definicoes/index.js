import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Octicons } from "@expo/vector-icons";

const Definicoes = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.elipseContainer}>
        <View style={styles.elipse}>
          <Image
            style={styles.imagemElipse}
            source={require("../../assets/images/bichos.png")}
          />
        </View>
        <Text style={styles.title}>Bichos</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.phoneContainer}>
          <Text style={styles.infoText}>Novo Email:</Text>
          <TextInput style={styles.input} placeholder="lorem@hotmail.com" />
        </View>

        <View style={styles.separator} />
        <View style={styles.phoneContainer}>
          <Text style={styles.infoText}>Password Atual:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="**********"
          />
        </View>
        <View style={styles.separator} />
        <View style={styles.phoneContainer}>
          <Text style={styles.infoText}>Nova Password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="**********"
          />
        </View>
        <View style={styles.separator} />
        <View style={styles.phoneContainer}>
          <Text style={styles.infoText}>Confirmar Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="**********"
          />
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Guardar Alterações</Text>
        </TouchableOpacity>
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
  iconContainer: {
    flexDirection: "row",
    position: "absolute",
    top: -190,
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
    marginBottom: 5,
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
  input: {
    fontSize: 16,
    textAlign: "right",
    width: "50%",
  },
  footer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#1a82eb',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 20,
    marginTop: 17,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default Definicoes;
