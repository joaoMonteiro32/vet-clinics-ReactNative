import React from "react";
import { StyleSheet, View, Text, Image, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { allcalendario, prencher, nomebyid } from "../../../services/firebase";
import * as DocumentPicker from 'expo-document-picker';


const exportToExcel = async () => {
  prencher();
  year = 2023
  const data = allcalendario(year);
  const arrayOfArrays = [
    ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

  ]
  for (i = 0; i < 31; i++) {
    if (year % 4 == 0) {
      if (i < 29)
        arrayOfArrays.push([nomebyid(data.M01Janeiro[i]), nomebyid(data.M02Fevereiro[i]), nomebyid(data.M03Março[i]), nomebyid(data.M04Abril[i]), nomebyid(data.M05Maio[i]), nomebyid(data.M06Junho[i]), nomebyid(data.M07Julho[i]), nomebyid(data.M08Agosto[i]), nomebyid(data.M09Setembro[i]), nomebyid(data.M10Outubro[i]), nomebyid(data.M11Novembro[i]), nomebyid(data.M12Dezembro[i])]);
      else if (i < 30)
        arrayOfArrays.push([nomebyid(data.M01Janeiro[i]), '', nomebyid(data.M03Março[i]), nomebyid(data.M04Abril[i]), nomebyid(data.M05Maio[i]), nomebyid(data.M06Junho[i]), nomebyid(data.M07Julho[i]), nomebyid(data.M08Agosto[i]), nomebyid(data.M09Setembro[i]), nomebyid(data.M10Outubro[i]), nomebyid(data.M11Novembro[i]), nomebyid(data.M12Dezembro[i])]);
      else if (i < 31)
        arrayOfArrays.push([nomebyid(data.M01Janeiro[i]), '', nomebyid(data.M03Março[i]), '', nomebyid(data.M05Maio[i]), '', nomebyid(data.M07Julho[i]), nomebyid(data.M08Agosto[i]), '', nomebyid(data.M10Outubro[i]), '', nomebyid(data.M12Dezembro[i])]);
    }
    else {
      if (i < 28)
        arrayOfArrays.push([nomebyid(data.M01Janeiro[i]), nomebyid(data.M02Fevereiro[i]), nomebyid(data.M03Março[i]), nomebyid(data.M04Abril[i]), nomebyid(data.M05Maio[i]), nomebyid(data.M06Junho[i]), nomebyid(data.M07Julho[i]), nomebyid(data.M08Agosto[i]), nomebyid(data.M09Setembro[i]), nomebyid(data.M10Outubro[i]), nomebyid(data.M11Novembro[i]), nomebyid(data.M12Dezembro[i])]);
      else if (i < 30)
        arrayOfArrays.push([nomebyid(data.M01Janeiro[i]), '', nomebyid(data.M03Março[i]), nomebyid(data.M04Abril[i]), nomebyid(data.M05Maio[i]), nomebyid(data.M06Junho[i]), nomebyid(data.M07Julho[i]), nomebyid(data.M08Agosto[i]), nomebyid(data.M09Setembro[i]), nomebyid(data.M10Outubro[i]), nomebyid(data.M11Novembro[i]), nomebyid(data.M12Dezembro[i])]);
      else if (i < 31)
        arrayOfArrays.push([nomebyid(data.M01Janeiro[i]), '', nomebyid(data.M03Março[i]), '', nomebyid(data.M05Maio[i]), '', nomebyid(data.M07Julho[i]), nomebyid(data.M08Agosto[i]), '', nomebyid(data.M10Outubro[i]), '', nomebyid(data.M12Dezembro[i])]);
    }
  }

  const worksheet = XLSX.utils.aoa_to_sheet(arrayOfArrays);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');


  const wbout = XLSX.write(workbook, { type: 'base64', bookType: 'xlsx' });

  const customDirectory = 'thisIsAFolder';
  const fileName = '2023.xlsx';
  const destinationDirectory = `${FileSystem.cacheDirectory}${customDirectory}/`;
  const destinationPath = `${destinationDirectory}${fileName}`;
  console.log(destinationPath);
  try {

    await FileSystem.makeDirectoryAsync(destinationDirectory, {
      intermediates: true,
    });

    await FileSystem.writeAsStringAsync(destinationPath, wbout, {
      encoding: FileSystem.EncodingType.Base64,
    });

    await Sharing.shareAsync(destinationPath);

    console.log('File saved and shared:', destinationPath);
  } catch (error) {
    console.error('Error saving file:', error);
  }
};

const chooseFile = async () => {
  try {
    const res = await DocumentPicker.getDocumentAsync({
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    if (res.type === 'success') {
      const filePath = res.uri;
      console.log(filePath);

      const excelData = await readExcelToArray(filePath);
      console.log('Excel data:', excelData);
    } else {
      console.log('File picking cancelled');
    }
  } catch (error) {
    console.error('Error picking file:', error);
  }
};

const readExcelToArray = async (fileUri) => {
  try {
    const response = await fetch(fileUri);
    const fileData = await response.arrayBuffer();
    const binaryData = Array.from(new Uint8Array(fileData)).map(byte => String.fromCharCode(byte)).join('');
    reader.readAsArrayBuffer(fileUri);

    const workbook = XLSX.read(binaryData, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    return jsonData;
  } catch (error) {
    console.log('Error reading Excel file:', error);
    return null;
  }
};



const PainelAdministrador = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.headerImage}
        source={require("../../../assets/images/suv.png")}
      />
      <View style={styles.headerContainer}>

        <Text style={styles.title}>Painel Administrador</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <View style={styles.button}>
            <TouchableOpacity onPress={chooseFile}>
              <Image source={require("../../../assets/images/importar.png")} style={styles.imagembutton1} />
              <Text style={styles.buttonText}>Importar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={exportToExcel} >
              <Image source={require("../../../assets/images/exportar.png")} style={styles.imagembutton2} />
              <Text style={styles.buttonText}>Exportar </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => { navigation.navigate('Alteracao Manual'); }}>
              <Image source={require("../../../assets/images/alteracao_manual_turnos.png")} style={styles.imagembutton3} />
              <Text style={styles.buttonText2}>{'\n'}Alterar Turnos</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginBottom: -20 }}></View>
        <View style={styles.buttonRow2}>
          <View style={styles.buttoncandidaturas}>
            <TouchableOpacity style={{ paddingTop: 20 }} onPress={() => { navigation.navigate('Gerir Candidaturas'); }}>
              <Image source={require("../../../assets/images/candidaturas.png")} style={styles.imagembutton} />
              <Text style={styles.buttonText}>Gerir{'\n'}Candidaturas</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonregisto}>
            <TouchableOpacity onPress={() => { navigation.navigate('Historico Candidaturas'); }}>
              <Image source={require("../../../assets/images/historico2.png")} style={styles.imagembutton} />
              <Text style={styles.buttonText}>Historico Candidaturas</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonregisto}>
            <TouchableOpacity onPress={() => { navigation.navigate('Historico Alteracao de Turnos'); }}>
              <Image source={require("../../../assets/images/historico.png")} style={styles.imagembutton} />
              <Text style={styles.buttonText}>Historico Turnos</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagembutton: {
    left: '35%',

  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 0,
    paddingTop: 90,
    backgroundColor: "#F5F5DC",
  },
  headerImage: {
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    paddingBottom: 20,
  },
  buttonContainer: {
    alignItems: "center",
    backgroundColor: "#F5F5DC",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginVertical: 5,
    paddingTop: 10,
    left: "2%",
  },
  buttonRow2: {
    flexDirection: "row",
    width: "80%",
    marginVertical: 5,
    left: '3%',
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 0,
    paddingBottom: 5,
    borderRadius: 10,
    width: "30%",
    height: "70%",
    alignItems: "center",
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginRight: 20,
  },
  buttoncandidaturas: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "35%",
    height: "120%",
    marginRight: 20,
    paddingHorizontal: 10,
  },
  buttonregisto: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "35%",
    height: "120%",
    marginRight: 20,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 15,
    paddingTop: 10,
    textAlign: 'center',
  },
  buttonText2: {
    fontSize: 15,
    paddingTop: 10,
    textAlign: 'center',
  },
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#F5F5DC"
  },
  iconContainer: {
    flexDirection: "row",
    position: "absolute",
    top: -90,
    right: 10,
  },
  imagembutton1: {
    left: '20%',
  },
  imagembutton2: {
    left: '25%',
  },
  imagembutton3: {
    left: '22%',
    top: '20%',
  },
});

export default PainelAdministrador;
