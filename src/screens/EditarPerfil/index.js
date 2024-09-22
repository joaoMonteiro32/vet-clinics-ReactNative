import React, { useState,useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { getStorage, ref, uploadBytes,getDownloadURL } from 'firebase/storage';
import firebase from 'firebase/compat/app';
import { toByteArray } from 'base64-js';
import { app,buscar, saveclinica } from "../../services/firebase.js";



const storage = getStorage(app);
let uri;



let clinica =[];


const EditarPerfil = ({route,navigation}) => {
  
  let id='ttVHeDtqD0Z9gGqNAJOFEJY3aPm2';
  const [image, setImage] = useState(null);
  const [nome, setnome] = useState("");
  const [telefone, settelefone] = useState("");
  const [morada, setmorada] = useState("");
  const [Latitude, setLatitude] = useState("");
  const [Longitude, setLongitude] = useState("");
useEffect(() => {
  clinica=buscar(id); 
  const loadImage = async () => {
      const storageRef = ref(storage, `${id}.png`); // Path to the image in Firebase Storage
      uri = await getDownloadURL(storageRef);
      console.log("loading");
      setImage(uri);
      console.log("loaded");
  };
  loadImage();
  setnome(clinica.data.nome);
  settelefone(clinica.data.telefone);
  setmorada(clinica.data.morada);
  setLatitude(""+clinica.data.Coordenadas.latitude);
  setLongitude(""+clinica.data.Coordenadas.longitude);
  console.log(Latitude)
}, [route]);
console.log(Latitude)

async function pickImage  ()  {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      uri=selectedImageUri;
      setImage(uri);
    }
  
}
async function submeter ()  {
  const storageRef = ref(storage, `${id}.png`);
  try {
    const blob= await new Promise((resolve,reject) => {
        const xhr = new XMLHttpRequest();
      xhr.onload = function(){
        resolve(xhr.response);
      };
      xhr.onerror = function (e){
        console,log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType="blob";
      xhr.open("GET",uri,true);
      xhr.send(null);
    });
     // Provide the desired path and filename for the uploaded image
    await uploadBytes(storageRef, blob);
    setImage(uri);
    console.log('Image uploaded successfully');
    navigation.navigate("Perfil");
  } catch (error) {
    console.error('Error uploading image:', error);
  }

   clinica.data.telefone=telefone;
   clinica.data.morada=morada;
   clinica.data.Coordenadas.latitude=Latitude;
   clinica.data.Coordenadas.longitude=Longitude;

   saveclinica(clinica);

}

const handletelefone = (newText) => {
  settelefone(newText);
};
const handleLatitude = (newText) => {
  setLatitude(newText);
};
const handleLongitude = (newText) => {
  setLongitude(newText);
};
const handleMorada = (newText) => {
  setmorada(newText);
};
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.elipseContainer}>
        <View style={styles.elipse}>
          <Image
            style={styles.imagemElipse}
            source={image ? { uri: image } : require("../../assets/images/bichos.png")}
          />
          <MaterialCommunityIcons 
            name="camera-plus-outline" 
            size={24} 
            color="black" 
            style={styles.cameraIcon} 
            onPress={pickImage}
          />
        </View>
        <Text style={styles.title}>{nome}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.phoneContainer}>
          <Text style={styles.infoText}>Telefone:</Text>
          <TextInput
            value={telefone}
            onChangeText={handletelefone}
            style={styles.input}
            keyboardType="number-pad"
            placeholder="Novo Telefone"
          />
        </View>

        <View style={styles.separator} />
        <View style={styles.phoneContainer}>
          <Text style={styles.infoText}>Morada: </Text>
          <TextInput 
          onChangeText={handleMorada}
          value={morada}
          style={styles.input} 
          placeholder="Nova Morada" />
        </View>
        <View style={styles.separator} />
        <View style={styles.phoneContainer}>
          <Text style={styles.infoText}>Latitude</Text>
          <TextInput
            value={Latitude}
            onChangeText={handleLatitude}
            style={styles.input}
            keyboardType="number-pad"
            placeholder="Latitude"
          />
          
        </View>
        <View style={styles.phoneContainer}>
        <Text style={styles.infoText}>Longitude</Text>
          <TextInput
            value={Longitude}
            onChangeText={handleLongitude}
            style={styles.input}
            keyboardType="number-pad"
            placeholder="Longitude"
          />
          </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={submeter}>
          <Text style={styles.buttonText}>Guardar Alterações</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
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
    position: "relative",
  },
  imagemElipse: {
    width: 90,
    height: 90,
    marginBottom: 5,
    borderRadius:50,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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

export default EditarPerfil;
