import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { createUserWithEmailAndPassword, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {
  collection,
  getDocs,
  doc,
  getFirestore,
  updateDoc,
  setDoc ,
  onSnapshot ,
  GeoPoint,
  getDoc
} from "firebase/firestore";
import '@firebase/auth';
import '@firebase/firestore';
let admin=0;
let login=0;
let id="FvagG1tY23Tpv9p66s6bZwCEuBd1g9";


export function logining(idlog){
  if(idlog=="kdHUspHsJqbMyfNTVjg4uXnRb8g1")
    admin=1;
  else
    admin=0;
  login=1;
  id=idlog;
}


export function logouting(){
  console.log("tried")
  login=0;
  admin=0;
}

export function logged(){
  return login;
}

export function isadmin(){
  if(admin)
  return admin;
}

export function useriding(){
  return id;
}

const firebaseConfig = {
  apiKey: "xxxxxxxxxx",
  authDomain: "qrcode-e97a2.firebaseapp.com",
  projectId: "qrcode-e97a2",
  storageBucket: "qrcode-e97a2.appspot.com",
  messagingSenderId: "789541971400",
  appId: "1:789541971400:web:dc211e1bf2ac6915dd8cfd",
  measurementId: "G-9KMXZWZCV1",
};

const app = firebase.initializeApp(firebaseConfig);

const storage = getReactNativePersistence(ReactNativeAsyncStorage);

const db = getFirestore(app);
let clinica=[];
let calendario=[];
let Troca=[];
let  Paginamain=0;
let AltePedido=0;
let PendPedido=0;
let Historico=0;
let ListClinica=0;
let Load=0;
let diaatual;
let mesatual;
let anoatual;
let clinicaspendentes=[];
async function iniciarclinicaspendentes() {
  try{
    const querySnapshot = await getDocs(collection(db, "clinicas_pendentes"));
    const clinicaspendentesData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    clinicaspendentes= clinicaspendentesData;
  } catch (erro) {
    console.log("Erro na busca por Clinicas Pendentes", erro);
  }
}
export function allcandidaturas(){
  return clinicaspendentes;
}
export function allclinicaspendentes(){
  try {
    const pendentes=[];
      for(i=0;i<clinicaspendentes.length;i++){
        if(clinicaspendentes[i].data.estado=="pendente"){
          pendentes.push(clinicaspendentes[i]);
        }
      } 
      console.log(pendentes)
      return pendentes;
    } catch (error) {
        console.log(error);
      }

}

async function iniciarClinicas() {
  try{
    const querySnapshot = await getDocs(collection(db, "clinicas"));
    const clinicasData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    clinica=clinicasData;
  } catch (erro) {
    console.log("Erro na busca por Clínicas", erro);
  }
  AltePedido=1;
  PendPedido=1;
  Historico=1;
  ListClinica=1;
  Paginamain=1;
}
async function iniciarCalendario() {
  try{
    const querySnapshot = await getDocs(collection(db, "Calendario"));
    const calendarioData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    calendario=calendarioData;
  } catch (erro) {
    console.log("Erro na busca por Calendario", erro);
  }
  Paginamain=1;
  AltePedido=1;
  PendPedido=1;
}
async function iniciarTrocas() {
  try{
    const querySnapshot = await getDocs(collection(db, "Trocas"));
    const TrocasData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    Troca= TrocasData;
  } catch (erro) {
    console.log("Erro na busca por Calendario", erro);
  }
  Paginamain=1;
  AltePedido=1;
  PendPedido=1;
  Historico=1;
}




export function iniclin() {
  return new Promise(async (resolve, reject) => {
    try {
      const querySnapshot = await getDocs(collection(db, "clinicas_pendentes"));
      const clinicaspendentesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      clinicaspendentes=clinicaspendentesData;
      resolve(clinicaspendentesData);
    } catch (erro) {
      console.log("Erro na busca por Clinicas Pendentes", erro);
      reject(erro);
    }
  });
}





export function listenToUpdates() {
  if(new Date().getDate()!=diaatual){
    let data=new Date();
    diaatual=data.getDate();
    mesatual=data.getMonth();
    anoatual=data.getFullYear();
  }
  Paginamain=0;
   AltePedido=0;
   PendPedido=0;
   Historico=0;
   ListClinica=0;  
   const db = getFirestore(app);
  const clinicasRef = collection(db, "clinicas");
  const calendarioRef = collection(db, "Calendario");
  const trocasRef = collection(db, "Trocas");
  const candidaturasRed = collection(db, "clinicas_pendentes");

  // Set up listeners for updates to each collection
  const clinicasUnsubscribe =onSnapshot(clinicasRef,(snapshot) => {
    iniciarClinicas();
    console.log("Clinica");
  });
  
  const calendarioUnsubscribe = onSnapshot(calendarioRef,(snapshot) => {
    iniciarCalendario();
    console.log("Calendario");
  });

  const trocasUnsubscribe =onSnapshot(trocasRef,(snapshot) => {
    iniciarTrocas();
    console.log("Trocas"); 
    
  });
  const candidaturasUnsubscribe =onSnapshot(candidaturasRed,(snapshot) => {
    iniclin()
  console.log("Canditatura");
  Gercadida=1;
  if(Load==0)
  Load=1;
  });
}

export function servicocalendar(){
  
  let calen=calendar(diaatual,mesatual,anoatual)

  return calen;
  }

export function reloaded(pagina){
  if(pagina=="Pedido Alteracao"&&AltePedido==1){
    console.log("Pedido Alteracao");
    AltePedido=0;
    return 1;
  }
  if(pagina=="Pedido Pendente"&&PendPedido==1){
    console.log("Pedido Pendente");
    PendPedido=0;
    return 1;
  }
  if(pagina=="Historico"&&Historico==1){
    console.log("Historico");
    Historico=0;
    return 1;
  }
  if(pagina=="Lista de Clinica"&&ListClinica==1){
    console.log("Lista de Clinica");
    ListClinica=0;
    return 1;
  }
  if(pagina=="Main"&&Paginamain==1){
    console.log("Main");
    Paginamain=0;
    return 1;
  }
  if(pagina=="Load"&&Load==1){
    Load=2;
    return 1;
  }
  if(pagina=="imagem"&&Load==2){
    Load=2;
    return 1;
  }
}


export function allcalendario (year){
  return calendario[year-2023].data;
}



export function buscar(id){
  return clinica[clinica.findIndex(obj => obj.id == id)];
}




export async function ordenar(Escolha1) {
  const ordenarClinicas = async () =>{
    try {
      const querySnapshot = await getDocs(collection(db, "clinicas_pendentes"));
      const clinicasPendentesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
    if((clinicasPendentesData.length)<10){
      const TrocaRef = doc(db, 'clinicas_pendentes', "00000"+(clinicasPendentesData.length));
      await setDoc(TrocaRef, Escolha1);}
    else if(clinicasPendentesData.length<100){
      const TrocaRef = doc(db, 'clinicas_pendentes', "0000"+(clinicasPendentesData.length));
      await setDoc(TrocaRef, Escolha1);}
    else if(clinicasPendentesData.length<1000){
        const TrocaRef = doc(db, 'clinicas_pendentes', "000"+(clinicasPendentesData.length));
        await setDoc(TrocaRef, Escolha1);}
    else if(clinicasPendentesData.length<10000){
        const TrocaRef = doc(db, 'clinicas_pendentes', "00"+(clinicasPendentesData.length));
        await setDoc(TrocaRef, Escolha1);}
    else if(clinicasPendentesData.length<10000){
        const TrocaRef = doc(db, 'clinicas_pendentes', "0"+(clinicasPendentesData.length));
        await setDoc(TrocaRef, Escolha1);}
    else{
        const TrocaRef = doc(db, 'clinicas_pendentes', ""+(clinicasPendentesData.length));
        await setDoc(TrocaRef, Escolha1);}
      } catch (error) {
        console.log(error);
      }
  }
  await ordenarClinicas();
}


export function Exportar(Escolha1){
    async function adicionarDias() {
      try {
        const querySnapshot = await getDocs(collection(db, "Trocas"));
        const trocaData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        for(i=0;i<trocaData.length;i++){
          if(trocaData[i].data.Clinica1.dia==Escolha1.Clinica1.dia&&trocaData[i].data.Clinica1.id==Escolha1.Clinica1.id&&trocaData[i].data.Clinica2.dia==Escolha1.Clinica2.dia&&trocaData[i].data.Clinica2.id==Escolha1.Clinica2.id&&trocaData[i].data.estado==Escolha1.estado){
            return null;
          }
        }
        if((999999-trocaData.length)<10){
          const TrocaRef = doc(db, 'Trocas', "00000"+(999999-trocaData.length));
          await setDoc(TrocaRef, Escolha1);}
        else if(999999-trocaData.length<100){
          const TrocaRef = doc(db, 'Trocas', "0000"+(999999-trocaData.length));
          await setDoc(TrocaRef, Escolha1);}
        else if(999999-trocaData.length<1000){
            const TrocaRef = doc(db, 'Trocas', "000"+(999999-trocaData.length));
            await setDoc(TrocaRef, Escolha1);}
        else if(999999-trocaData.length<10000){
            const TrocaRef = doc(db, 'Trocas', "00"+(999999-trocaData.length));
            await setDoc(TrocaRef, Escolha1);}
        else if(999999-trocaData.length<10000){
            const TrocaRef = doc(db, 'Trocas', "0"+(999999-trocaData.length));
            await setDoc(TrocaRef, Escolha1);}
        else{
            const TrocaRef = doc(db, 'Trocas', ""+(999999-trocaData.length));
            await setDoc(TrocaRef, Escolha1);}
      } catch (error) {
        console.log(error);
      }
    }
    adicionarDias();
    
}

export function removeclinica(id){
  const clinicas=[];
  for(i=0;i<clinica.length;i++){
    if(clinica[i].id!=id){
      clinicas.push(clinica[i]);}
    }
return clinicas;
}

export function allclinicas(){
  return clinica;
}

export function alltrocas(id){
  
  try {
    const pendentes=[];
      for(i=0;i<Troca.length;i++){
        if(Troca[i].data.Clinica1.id==id||Troca[i].data.Clinica2.id==id){
          pendentes.push(Troca[i]);
        }
      } 
      return pendentes;
    } catch (error) {
        console.log(error);
      }
  return Troca;
}




export function trocar(dia1,dia2,id1,id2){
  
console.log(dia1);
console.log(dia2);

  let date = new Date(dia1);
  calendartrocar(date.getFullYear(),date.getMonth(),date.getDate(),id2);

   date = new Date(dia2);
   calendartrocar(date.getFullYear(),date.getMonth(),date.getDate(),id1);
  async function adicionarDias() {
    try {
      
      const calendarioRef = doc(db, 'Calendario', "2023");
      await updateDoc(calendarioRef, calendario[0].data);

    } catch (error) {
      console.log(error);
    }
  }
  adicionarDias();

}


export async function alterarEstadoAprovado(nomeClinica){
  console.log(clinicaspendentes);

  let nomedaClinica =clinicaspendentes[clinicaspendentes.findIndex(obj => obj.data.nome == nomeClinica)];
  console.log(nomedaClinica);
  try {
    const clinicaRef = doc(db, 'clinicas_pendentes', nomedaClinica.id);
    const clinicaSnap = await getDoc(clinicaRef);

    if (!clinicaSnap.exists()) {
      console.log('No such document!');
      return;
    }

    const clinicaData = clinicaSnap.data();

    await updateDoc(clinicaRef, {
      estado: "aprovado"
    });
    
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, clinicaData.email, clinicaData.password);
    console.log(auth);
    especialclinica={
      data:{
       'Coordenadas':new GeoPoint(nomedaClinica.data.latitude, nomedaClinica.data.longitude),
       'email':nomedaClinica.data.email,
       'morada':nomedaClinica.data.morada,
       'nome':nomedaClinica.data.nome,
       'telefone':nomedaClinica.data.telefone
     },
   id:auth.currentUser.uid,
   }
   saveclinica(especialclinica);
    
  } catch (error) {
    console.log(error);
  }
}
export function saveclniinica(clinicado){
  console.log(clinicado.id);
  console.log(clinicado);
  geopoint = new GeoPoint(clinicado.data.Coordenadas.latitude, clinicado.data.Coordenadas.longitude);
  clinicasave={
    'Coordenadas':geopoint,
    'email':clinicado.data.email,
    'morada':clinicado.data.morada,
    'nome':clinicado.data.nome,
    'telefone':clinicado.data.telefone
  }

  async function adicionarClinicado() {
    try {
          const TrocaRef = doc(db, 'clinicas', clinicado.id);
          await setDoc(TrocaRef, clinicasave);

    } catch (error) {
      console.log(error);
    }
  }
  adicionarClinicado();
}
export function alterarEstadoRecusado(nomeClinica){
  async function adicionarDias() {
    try {
      const calendarioRef = doc(db, 'clinicas_pendentes', nomeClinica);
      await updateDoc(calendarioRef, {
        estado: "recusado"
      });

    } catch (error) {
      console.log(error);
    }
  }
  adicionarDias();

}

export async function adicionarClinicas(nome, telefone, email, morada, latitude, longitude, password, confirmarPassword, estado) {
  console.log("botao premido");

  async function addDias() {
    try {
      const clinicaData = {
        nome: nome,
        telefone: telefone,
        email: email,
        morada: morada,
        latitude: latitude,
        longitude: longitude,
        password: password,
        confirmarPassword: confirmarPassword,
        estado: estado
      };
      
      ordenar(clinicaData);
      // const addClinica = doc(db, 'clinicas_pendentes', nome);
      // await setDoc(addClinica, clinicaData);
      alert("Candidatura enviada com sucesso");
    } catch (error) {
      alert("Erro ao enviar a sua candidatura, tente denovo!");
      console.log(error);
    }
  }

  // Chamar a função addDias() aqui
  await addDias();
}

  export function trocasPendentes(id) {
    try {
      const pendentes=[];
        for(i=0;i<Troca.length;i++){
          if(Troca[i].data.estado=="pendente"&&Troca[i].data.Clinica2.id==id){
            pendentes.push(Troca[i]);
          }
        } 
        return pendentes;
      } catch (error) {
          console.log(error);
        }
}
export function calendartrocar(ano,mes,dia,id){
  dia=parseInt(dia);
  mes=parseInt(mes);
  ano=parseInt(ano);
  console.log(dia+" "+mes);
  if(mes=="0")
  calendario[ano-2023].data.M01Janeiro[dia-1]=id;
  if(mes=="1")
  calendario[ano-2023].data.M02Fevereiro[dia-1]=id;
  if(mes=="2")
  calendario[ano-2023].data.M03Março[dia-1]=id;
  if(mes=="3")
  calendario[ano-2023].data.M04Abril[dia-1]=id;
  if(mes=="4")
  calendario[ano-2023].data.M05Maio[dia-1]=id;
  if(mes=="5")
  console.log(calendario[ano-2023].data.M06Junho[dia-1]);
  if(mes=="6")
  calendario[ano-2023].data.M07Julho[dia-1]=id;
  if(mes=="7")
  calendario[ano-2023].data.M08Agosto[dia-1]=id;
  if(mes=="8")
  calendario[ano-2023].data.M09Setembro[dia-1]=id;
  if(mes=="9")
  calendario[ano-2023].data.M10Outubro[dia-1]=id;
  if(mes=="10")
  calendario[ano-2023].data.M11Novembro[dia-1]=id;
  if(mes=="11")
  calendario[ano-2023].data.M12Dezembro[dia-1]=id;
}
export function excalenda(id){
  const calendaru=[];
  
  for(i=0;i<12;i++){
    if(mesatual-1<i){
    for(ii=0;ii<31;ii++){
      if(mesatual-1<i&&diaatual-2<ii){
      if(i==0&&calendario[0].data.M01Janeiro[ii]!=id){
        if(ii<9)
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-0'+(ii+1));
        else
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-'+(ii+1));
      }
      if(i==1&&calendario[0].data.M02Fevereiro[ii]!=id){
        if(ii<9)
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-0'+(ii+1));
        else 
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-'+(ii+1));
      }
      if(i==2&&calendario[0].data.M03Março[ii]!=id){
        if(ii<9)
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-0'+(ii+1));
        else 
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-'+(ii+1));
      }
      if(i==3&&calendario[0].data.M04Abril[ii]!=id){
        if(ii<9)
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-0'+(ii+1));
        else 
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-'+(ii+1));
      }
      if(i==4&&calendario[0].data.M05Maio[ii]!=id){
        if(ii<9)
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-0'+(ii+1));
        else
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-'+(ii+1));
      }
      if(i==5&&calendario[0].data.M06Junho[ii]!=id){
        if(ii<9)
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-0'+(ii+1));
        else 
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-'+(ii+1));
      }
      if(i==6&&calendario[0].data.M07Julho[ii]!=id){
        if(ii<9)
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-0'+(ii+1));
        else
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-'+(ii+1));
      }
      if(i==7&&calendario[0].data.M08Agosto[ii]!=id){
        if(ii<9)
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-0'+(ii+1));
        else
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-'+(ii+1));
      }
    if(i==8&&calendario[0].data.M09Setembro[ii]!=id){
      if(ii<9)
      calendaru.push(calendario[0].id+'-0'+(i+1)+'-0'+(ii+1));
      else
      calendaru.push(calendario[0].id+'-0'+(i+1)+'-'+(ii+1));
    }
    if(i==9&&calendario[0].data.M10Outubro[ii]!=id){
      if(ii<9)
      calendaru.push(calendario[0].id+'-'+(i+1)+'-0'+(ii+1));
      else
      calendaru.push(calendario[0].id+'-'+(i+1)+'-'+(ii+1));
    }if(i==10&&calendario[0].data.M11Novembro[ii]!=id){
      if(ii<9)
      calendaru.push(calendario[0].id+'-'+(i+1)+'-0'+(ii+1));
      else
      calendaru.push(calendario[0].id+'-'+(i+1)+'-'+(ii+1));
    }if(i==11&&calendario[0].data.M12Dezembro[ii]!=id){
       if(ii<9)
      calendaru.push(calendario[0].id+'-'+(i+1)+'-0'+(ii+1));
      else
      calendaru.push(calendario[0].id+'-'+(i+1)+'-'+(ii+1));
    }
  }
  }}
  }
return calendaru;
}
export function prencher(){
  let id;
  const calendario2={
    M01Janeiro:[],
    M02Fevereiro:[],
    M03Março:[],
    M04Abril:[],
    M05Maio:[],
    M06Junho:[],
    M07Julho:[],
    M08Agosto:[],
    M09Setembro:[],
    M10Outubro:[],
    M11Novembro:[],
    M12Dezembro:[]}
    ano=2023;
  for(mes=0;mes<12;mes++){
    for(dia=1;dia<32;dia++){
      let random=Math.floor(Math.random() * 4  );
if(random==0)
  id = "FvagG1tY23Tpv9p66s6bZwCEuBd1g9";
else if(random==1)
     id = "vDzyimtF5vOUTxXgVN0BE1LG6Rp2";
else if(random==2)
     id ="1eb6awg9utZCvpTpY66E1B3GsdF2";
else if(random==3)
   id ="ttVHeDtqD0Z9gGqNAJOFEJY3aPm2";

  if(mes=="0")
  calendario2.M01Janeiro[dia-1]=id;
  if(mes=="1")
  calendario2.M02Fevereiro[dia-1]=id;
  if(mes=="2")
  calendario2.M03Março[dia-1]=id;
  if(mes=="3")
  calendario2.M04Abril[dia-1]=id;
  if(mes=="4")
  calendario2.M05Maio[dia-1]=id;
  if(mes=="5")
  calendario2.M06Junho[dia-1]=id;
  if(mes=="6")
  calendario2.M07Julho[dia-1]=id;
  if(mes=="7")
  calendario2.M08Agosto[dia-1]=id;
  if(mes=="8")
  calendario2.M09Setembro[dia-1]=id;
  if(mes=="9")
  calendario2.M10Outubro[dia-1]=id;
  if(mes=="10")
  calendario2.M11Novembro[dia-1]=id;
  if(mes=="11")
  calendario2.M12Dezembro[dia-1]=id;
}
}

async function adicionarDias(doces) {
  try {
    
    const clinicaRef = doc(db, 'Calendario', "2023");
    await updateDoc(clinicaRef, doces);

  } catch (error) {
    console.log(error);
  }
}
for(i=0;i<Troca.length;i++){
   adicionarDias(calendario2);

}
}
export function calenda(id){
  const calendaru=[];
  for(i=0;i<12;i++){
    if(mesatual-1<i){
    for(ii=0;ii<31;ii++){
      if(mesatual-1<i&&diaatual-2<ii){
      if(i==0&&calendario[0].data.M01Janeiro[ii]==id){
        if(ii<9)
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-0'+(ii+1));
        else
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-'+(ii+1));
      }
      if(i==1&&calendario[0].data.M02Fevereiro[ii]==id){
        if(ii<9)
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-0'+(ii+1));
        else 
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-'+(ii+1));
      }
      if(i==2&&calendario[0].data.M03Março[ii]==id){
        if(ii<9)
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-0'+(ii+1));
        else 
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-'+(ii+1));
      }
      if(i==3&&calendario[0].data.M04Abril[ii]==id){
        if(ii<9)
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-0'+(ii+1));
        else 
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-'+(ii+1));
      }
      if(i==4&&calendario[0].data.M05Maio[ii]==id){
        if(ii<9)
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-0'+(ii+1));
        else
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-'+(ii+1));
      }
      if(i==5&&calendario[0].data.M06Junho[ii]==id){
        if(ii<9)
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-0'+(ii+1));
        else 
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-'+(ii+1));
      }
      if(i==6&&calendario[0].data.M07Julho[ii]==id){
        if(ii<9)
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-0'+(ii+1));
        else
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-'+(ii+1));
      }
      if(i==7&&calendario[0].data.M08Agosto[ii]==id){
        if(ii<9)
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-0'+(ii+1));
        else
        calendaru.push(calendario[0].id+'-0'+(i+1)+'-'+(ii+1));
      }
    if(i==8&&calendario[0].data.M09Setembro[ii]==id){
      if(ii<9)
      calendaru.push(calendario[0].id+'-0'+(i+1)+'-0'+(ii+1));
      else
      calendaru.push(calendario[0].id+'-0'+(i+1)+'-'+(ii+1));
    }
    if(i==9&&calendario[0].data.M10Outubro[ii]==id){
      if(ii<9)
      calendaru.push(calendario[0].id+'-'+(i+1)+'-0'+(ii+1));
      else
      calendaru.push(calendario[0].id+'-'+(i+1)+'-'+(ii+1));
    }if(i==10&&calendario[0].data.M11Novembro[ii]==id){
      if(ii<9)
      calendaru.push(calendario[0].id+'-'+(i+1)+'-0'+(ii+1));
      else
      calendaru.push(calendario[0].id+'-'+(i+1)+'-'+(ii+1));
    }if(i==11&&calendario[0].data.M12Dezembro[ii]==id){
       if(ii<9)
      calendaru.push(calendario[0].id+'-'+(i+1)+'-0'+(ii+1));
      else
      calendaru.push(calendario[0].id+'-'+(i+1)+'-'+(ii+1));
    }
    }}}
  }
return calendaru;
}
export function calendar(dia,mes,ano){
  if(mes=="0")
  return buscar(calendario[ano-2023].data.M01Janeiro[dia-1]);
  if(mes=="1")
  return buscar(calendario[ano-2023].data.M02Fevereiro[dia-1]);
  if(mes=="2")
  return buscar(calendario[ano-2023].data.M03Março[dia-1]);
  if(mes=="3")
  return buscar(calendario[ano-2023].data.M04Abril[dia-1]);
  if(mes=="4")
  return buscar(calendario[ano-2023].data.M05Maio[dia-1]);
  if(mes=="5")
  return buscar(calendario[ano-2023].data.M06Junho[dia-1]);
  if(mes=="6")
  return buscar(calendario[ano-2023].data.M07Julho[dia-1]);
  if(mes=="7")
  return buscar(calendario[ano-2023].data.M08Agosto[dia-1]);
  if(mes=="8")
  return buscar(calendario[ano-2023].data.M09Setembro[dia-1]);
  if(mes=="9")
  return buscar(calendario[ano-2023].data.M10Outubro[dia-1]);
  if(mes=="10")
  return buscar(calendario[ano-2023].data.M11Novembro[dia-1]);
  if(mes=="11")
  return buscar(calendario[ano-2023].data.M12Dezembro[dia-1]);
}

function extractDateValues(dateString) {
  const [year, month, day] = dateString.split('-');
  return { day, month, year };
}


export function nomebyid(id){
  return clinica[clinica.findIndex(obj => obj.id == id)].data.nome;
}
function confirm (item){
  for(i=0;i<Troca.length;i++){
    if(Troca[i].id == item.id && Troca[i].data.estado=="pendente"){
      console.log(Troca[i].data.estado);
      trocar(extractDateValues(item.data.Clinica1.dia),extractDateValues(item.data.Clinica2.dia),item.data.Clinica1.id,item.data.Clinica2.id);
      Troca[i]=item;
      console.log("trocou");
    }
    else if(Troca[i].data.estado=="pendente"&&Troca[i].id!=item.id&&(Troca[i].data.Clinica1.dia==item.data.Clinica1.dia||Troca[i].data.Clinica2.dia==item.data.Clinica2.dia||Troca[i].data.Clinica2.dia==item.data.Clinica1.dia||Troca[i].data.Clinica1.dia==item.data.Clinica2.dia)){
      Troca[i].data.estado="negado";
    }
  }
}

export function update(list){
confirm(list);

async function adicionarDias(doces) {
  try {
    
    const clinicaRef = doc(db, 'Trocas', doces.id);
    await updateDoc(clinicaRef, doces.data);

  } catch (error) {
    console.log(error);
  }
}
for(i=0;i<Troca.length;i++){
   adicionarDias(Troca[i]);

}
}
export function saveclinica(clinicado){
  geopoint = new GeoPoint(clinicado.data.Coordenadas.latitude, clinicado.data.Coordenadas.longitude);
  clinicasave={
    'Coordenadas':geopoint,
    'email':clinicado.data.email,
    'morada':clinicado.data.morada,
    'nome':clinicado.data.nome,
    'telefone':clinicado.data.telefone
  }

  async function adicionarDias() {
    try {
          const TrocaRef = doc(db, 'clinicas', clinicado.id);
          await setDoc(TrocaRef, clinicasave);
          
    } catch (error) {
      console.log(error);
    }
  }
  adicionarDias();
}



export default app;
