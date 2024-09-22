import React,{useState}from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { update,app,allclinicas, trocasPendentes, alltrocas,trocar,reloaded } from "../../services/firebase.js";
import { useEffect } from "react";



const PedidosPendentes = ({route}) => {
  const [trocas, settrocas]=useState([]);
  const [reload, setreload] = useState(0);
  useEffect(() => {
    settrocas(trocasPendentes(route.params.docid));
    console.log(trocas.length);
  },[route]);  

  setInterval(() => {
    if(reloaded("Pedido Pendente")==1){
    settrocas(trocasPendentes(route.params.docid));
    console.log("fodeu");
    }
    }, 500);

function aceitar(item){

const enviado={
  id:item.id,
  data:{
  Clinica1:{
    dia:item.data.Clinica1.dia,
    id:item.data.Clinica1.id,
    nome:item.data.Clinica1.nome,
  },
  Clinica2:{
    dia:item.data.Clinica2.dia,
    id:item.data.Clinica2.id,
    nome:item.data.Clinica2.nome,
  },
  estado:"executado"
}}
update(enviado);
settrocas(trocasPendentes(route.params.docid));
}

function reloading(){
  setreload(reload + 1);
}
function rejeitar(item){
  
const enviado={
  id:item.id,
  data:{
  Clinica1:{
    dia:item.data.Clinica1.dia,
    id:item.data.Clinica1.id,
    nome:item.data.Clinica1.nome,
  },
  Clinica2:{
    dia:item.data.Clinica2.dia,
    id:item.data.Clinica2.id,
    nome:item.data.Clinica2.nome,
  },
  estado:"negado",
}
}

update(enviado);
settrocas(trocasPendentes(route.params.docid));

}
const renderItem = ({ item }) => {
  return (<View  style={styles.rectangle}>
    <Text style={styles.titulo}>{item.data.Clinica1.nome}</Text>
    <Text style={styles.textAboveMiddleIcon}>{item.data.Clinica1.dia}</Text>
    <View style={styles.iconsContainer}>
      <TouchableOpacity onPress={() => aceitar(item)} >
        <Image
          source={require("../../assets/images/certo.png")}
          style={styles.imagem}
        />
      </TouchableOpacity>
      <Image
        source={require("../../assets/images/troca.png")}
        style={styles.troca}
      />
      <TouchableOpacity onPress={() => rejeitar(item)}>
        <Image
          source={require("../../assets/images/errado.png")}
          style={styles.imagem2}
        />
      </TouchableOpacity>
    </View>
    <Text style={styles.textbaixo}>{item.data.Clinica2.dia}</Text>
    <View style={styles.espaco}></View>
  </View>
  );
};
//<TouchableOpacity style={styles.submeterBotao} onPress={() => reloading()}/>
//reload

return (

<FlatList
data={trocas}
renderItem={renderItem}
keyExtractor={(item) => item.id}
contentContainerStyle={styles.container} 
>
</FlatList>

);
};

const styles = StyleSheet.create({
  textAboveMiddleIcon: {
    fontSize: 16,
    marginTop: 10,
  },
  troca: {
    width: 30,
    height: 30,
    marginLeft: 7,
  },
  submeterBotao: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: '25%',
    justifyContent: 'center',
    height: 60,
    borderRadius: 10,
    backgroundColor: '#0A4D68',
    alignItems: 'center',
  },
  imagem: {
    width: 60,
    height: 60,
    marginRight: 30,
  },
  imagem2: {
    width: 60,
    height: 60,
    marginLeft: 35,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#F5F5DC",
    paddingBottom: '10%',
  },
  rectangle: {
    width: "70%",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    padding: 20,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textbaixo: {
    fontSize: 16,
    marginTop: 10,
    justifyContent: "center"
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 7,
  },
  textBelowMiddleIcon: {
    fontSize: 14,
    marginTop: 10,
  },
  espaco: {
    width: 10,
  },
});

export default PedidosPendentes;