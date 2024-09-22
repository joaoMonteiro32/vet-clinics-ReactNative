import React,{useEffect,useState}from "react";
import { StyleSheet, ScrollView, View, Text, Image,FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Octicons } from "@expo/vector-icons";
import { app,allclinicas,listenToUpdates, alltrocas,reloaded } from "../../services/firebase.js";


const HistoricoAlteracaoTurnos = ({route}) => {
  const [trocas, settrocas]=useState([]);
  const [reload, setreload] = useState(0);
  useEffect(() => {listenToUpdates();
  settrocas(alltrocas(route.params.docid));
  },[route]);  

  setInterval(() => {
    if(reloaded("Historico")==1){
      settrocas(alltrocas(route.params.docid));
      console.log("fodeu");
    }
    }, 500);
    

const renderItem = ({ item }) => {
  return (
    <View style={styles.card}>
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{item.data.Clinica1.nome}</Text>
      <Text style={styles.textoemcima}>{item.data.Clinica1.dia}</Text>
      <Image
        source={require("../../assets/images/troca.png")}
        style={styles.troca}
      />
      <Text style={styles.textoembaixo}>{item.data.Clinica2.dia}</Text>
      <Text style={styles.cardTitle}>{item.data.Clinica2.nome}</Text>
      <View style={styles.cardStatus}>
        <Icon name={item.data.estado=="pendente"?"time-outline":item.data.estado=="executado"?"checkmark-outline":"close-outline"} size={25} color={item.data.estado=="pendente"?"#FFA500":item.data.estado=="executado"?"green":"red"} />
        <Text style={styles.cardStatusText}>Status: {item.data.estado}</Text>
      </View>
    </View>
  </View>
  );
};
return (
<FlatList
data={trocas}
renderItem={renderItem}
keyExtractor={(item) => item.id}
contentContainerStyle={styles.container}
/>
);
};

const styles = StyleSheet.create({
  troca: {
    width: 30,
    height: 30,
    marginVertical: 10,
  },
  textoemcima: {
    fontSize: 16,
    marginTop: 5,
  },
  textoembaixo: {
    fontSize: 16,
    marginBottom: 5,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5DC",
    paddingBottom: '10%'
  },
  card: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
    elevation: 5,

  },
  cardContent: {
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardSubtitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  cardStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardStatusText: {
    fontSize: 17,
  },
});

export default HistoricoAlteracaoTurnos;