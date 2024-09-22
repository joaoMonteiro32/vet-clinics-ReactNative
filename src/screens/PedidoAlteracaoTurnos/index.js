import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  FlatList,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Picker } from '@react-native-picker/picker';
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Exportar, allclinicas, buscar, removeclinica, calenda, excalenda,reloaded } from "../../services/firebase";
import { Feather } from '@expo/vector-icons';
let clinica = [];

const markedDates1 = {

};

let selectedDate1;
let selectedDate2;
let idperfil;
let name;
let preload=0;
let selected=0;
const PedidoAlteracao = ({route}) => {
  
  idperfil =route.params.docid;
  clinica=removeclinica(idperfil);
  if(preload==0){
    name=clinica[0].id;
    preload++;
  }
  
  const [Pickername, setPickername]=useState(name);
  const [reload, setreload] = useState(0);
  const [marked1, setmarked1] = useState({});
  const [sub, setsub]=useState(null);
 setInterval(() => {
    if(reloaded("Pedido Alteracao")==1){
      clinica=removeclinica(idperfil);
      let calendar1 = calenda(idperfil);
      let excalendar1 = excalenda(idperfil);
      let calendar2 = calenda(Pickername);
  
      for (i = 0; i < calendar1.length; i++) {
        // dias que a clinica esta de serviço
        markedDates1[calendar1[i]] = { dots:[{key:"clinica1",color:'77e5fc'}],selected: true, selectedColor: '#77e5fc', selectedTextColor: 'white', disableTouchEvent: false, selectedDotColor: "red" };
      }
      for (i = 0; i < excalendar1.length; i++) {
        // dias que a clinica nao esta de serviço
        markedDates1[excalendar1[i]] = { selected: true, selectedColor: 'white', selectedTextColor: 'black', disableTouchEvent: true };
      }
      for (i = 0; i < calendar2.length; i++) {
        // dias que a clinica 2 esta de serviço
        markedDates1[calendar2[i]] = { dots:[{key:"clinica2",color:'#7777fc'}],selected: true, selectedColor: '#7777fc', selectedTextColor: 'white', disableTouchEvent: false, selectedDotColor: "red" };
      }
      setreload(reload + 1);
      setmarked1(markedDates1);
    }
    }, 500);

  useEffect(() => {
  selected=0;
    
    clinica = removeclinica(idperfil);
    setsub(null);
    selectedDate1=null;
    selectedDate2=null;
    let calendar1 = calenda(idperfil);
    let excalendar1 = excalenda(idperfil);
    let calendar2 = calenda(Pickername);

    for (i = 0; i < calendar1.length; i++) {
      // dias que a clinica esta de serviço
      markedDates1[calendar1[i]] = { dots:[{key:"clinica1",color:'77e5fc'}],selected: true, selectedColor: '#77e5fc', selectedTextColor: 'white', disableTouchEvent: false, selectedDotColor: "red" };
    }
    for (i = 0; i < excalendar1.length; i++) {
      // dias que a clinica nao esta de serviço
      markedDates1[excalendar1[i]] = { selected: true, selectedColor: 'white', selectedTextColor: 'black', disableTouchEvent: true };
    }
    for (i = 0; i < calendar2.length; i++) {
      // dias que a clinica 2 esta de serviço
      markedDates1[calendar2[i]] = { dots:[{key:"clinica2",color:'#7777fc'}],selected: true, selectedColor: '#7777fc', selectedTextColor: 'white', disableTouchEvent: false, selectedDotColor: "red" };
    }
    setreload(reload + 1);
    setmarked1(markedDates1);
  }, [Pickername,sub,route]);

  const onDateChange1 = (date) => {
    if(markedDates1[date]!=undefined){
    if(markedDates1[date].selectedColor=="#77e5fc"){
    if (selectedDate1 != null) {
      //apos selecionar outro dia se ja um selecionado
      markedDates1[selectedDate1] = {  selected: true, selectedColor: "#77e5fc", selectedTextColor: "white", disableTouchEvent: false, selectedDotColor: "red" };
    } selectedDate1 = date;
    // cor de selecionar
    markedDates1[date] = {dots:[{key:"clinica2",color:'#77e5fc'}], selected: true, selectedColor: '#F5F5DC', selectedTextColor: '#000000', selectedDotColor: "red" };
  }
  else  if(markedDates1[date].selectedColor=="#7777fc"){
    if (selectedDate2 != 0 || selectedDate2 != null) {
      //apos selecionar outro dia se ja um selecionado
      markedDates1[selectedDate2] =  { selected: true, selectedColor: '#7777fc', selectedTextColor: 'white', disableTouchEvent: false, selectedDotColor: "red" };
    }
    selectedDate2 = date;
    // cor de selecionar
    markedDates1[date] = {dots:[{key:"clinica2",color:'#7777fc'}], selected: true, selectedColor: '#F5F5DC', selectedTextColor: '#000001', selectedDotColor: "red" };
  }
  else  if(markedDates1[date].selectedColor=="#F5F5DC"){
    if(markedDates1[date].selectedTextColor=='#000000'){
      markedDates1[selectedDate1] = { selected: true, selectedColor: "#77e5fc", selectedTextColor: "white", disableTouchEvent: false, selectedDotColor: "red" };
      selectedDate1=null;
    }
    else if(markedDates1[date].selectedTextColor=='#000001'){
      markedDates1[selectedDate2] =  { selected: true, selectedColor: '#7777fc', selectedTextColor: 'white', disableTouchEvent: false, selectedDotColor: "red" };
      selectedDate2=null;
    }
  }
  setmarked1(markedDates1);
  setreload(reload + 1);
}
  };



  function submeter(dia1, dia2) {
      setreload(reload + 1);
    const estado = {
      Clinica1: {
        dia: dia1,
        id: idperfil,
        nome: buscar(idperfil).data.nome,
      },
      Clinica2: {
        dia: dia2,
        id: name,
        nome: buscar(name).data.nome,
      },
      estado: "pendente"
    }
    setsub(1);
  if(dia1==null||dia2==null)
    return null;
    Exportar(estado);
  }
  function mudarnome(value){
    name=value;
    setPickername(name);
  }
  return (
    <>
      <View>
      </View>
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.label}>Clinica com que deseja efetuar a troca: </Text>

        <View style={styles.listItem}>
          <Picker
            selectedValue={name}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => mudarnome(itemValue)}
          >
            {clinica.map((item) => (
              <Picker.Item
                key={item.id}
                label={item.data.nome}
                value={item.id}
              />
            ))}
          </Picker>

        </View>
        <Text style={styles.label}>
        Troca entre{' '}
        <Text style={styles.Text1}> {buscar(idperfil).data.nome}</Text>
        {' e '}
        <Text style={styles.Text2}> {buscar(Pickername).data.nome}</Text>
      </Text>
        { (
          <Calendar
            style={styles.calendar}
            onDayPress={({ dateString }) => onDateChange1(dateString)}
            markingType="multi-dot"
            markedDates={marked1}
          />
        )}
        
        <TouchableOpacity style={styles.submeterBotao} onPress={() => submeter(selectedDate1, selectedDate2)}>
          <Text style={styles.buttonText}>Submeter</Text>
          <Feather name="send" size={24} color="white" style={styles.send} />
        </TouchableOpacity>
        <View style={styles.espaco} />

      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  send: {
    marginLeft: 5,
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
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white'

  },
  container1: {
    padding: 10,
    backgroundColor: '#F5F5DC',
    marginTop: 20,
  },
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#F5F5DC',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    paddingBottom: 7,
  },
  
  Text1: {
    
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    paddingBottom: 7,
    color: '#77e5fc',
  },
  Text2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    paddingBottom: 7,
    color: '#7777fc',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
    height: 100,
    textAlignVertical: "top",
  },
  calendar: {
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  }, espaco: {
    height: 35,
  },
  texto2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    paddingTop: 30,
    paddingBottom: 7,

  }
});

export default PedidoAlteracao;