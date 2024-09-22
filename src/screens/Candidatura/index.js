import React from "react";
import { StyleSheet, ScrollView, View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Octicons } from "@expo/vector-icons";

const Perfil = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}></View>
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
          <Text style={styles.infoText}>Telefone:</Text>
          <Text style={styles.infoText}>+351 912345678</Text>
        </View>

        <View style={styles.separator} />
        <View style={styles.phoneContainer}>
          <Text style={styles.infoText}>Morada: </Text>
          <Text style={styles.infoText}>Rua IPB, 123</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.phoneContainer}>
          <Text style={styles.infoText}>Email: </Text>
          <Text style={styles.infoText}>IPB@email.com</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.phoneContainer}>
          <Text style={styles.infoText}>Latitude:</Text>
          <Text style={styles.infoText}>-23.550520</Text>
        </View>
        <View style={styles.phoneContainer}>
          <Text style={styles.infoText}>Altitude:</Text>
          <Text style={styles.infoText}>-57.233551</Text>
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
