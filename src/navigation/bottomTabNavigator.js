import * as React from "react";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { View, ActivityIndicator, StyleSheet, Image, Dimensions, useState } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import {  NavigationContainer,
  useRoute,
  useIsFocused, } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import Icon1 from "react-native-vector-icons/Ionicons";
import { Octicons } from "@expo/vector-icons";
import { usuario, isSignedIn  } from "../screens/Login";
import { app, isadmin, useriding } from "../services/firebase.js";
import { reloaded ,logged} from "../services/firebase.js";



{/* <Octicons name="filter" size={24} color="black" /> */ }
let load = 0;
let user = false;
import {
  Calendario,

  Definicoes,
  GerirCandidaturas,
  HistoricoAlteracaoTurnos,
  ListaClinicas,
  Login,
  Main,
  PainelAdministrador,
  PedidoAlteracao,
  Perfil,
  Registo,
  Logout,
  PedidosPendentes,
  EditarPerfil,
  AlteracaoManual,
  HistoricoCandidaturas,
} from "../screens";
import { log } from "react-native-reanimated";
import { useEffect } from "react";
import LottieView from "lottie-react-native";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const Loading = ({ navigation }) => {
  setInterval(() => {
    if (reloaded("Load") == 1) {
      load = 1;
      navigation.navigate('Pagina Principal');
    }
  }, 500);
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};
//let idperfil = usuario.uidfinal;
let idperfil = "FvagG1tY23Tpv9p66s6bZwCEuBd1g9";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5F5DC'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  leftIconContainer: {
    position: "absolute",
    right: 1,
  },
  hide: {
    drawerItemStyle: { height: 0, marginTop: -5 }
  },
  rightIconContainer: {
    position: "absolute",
    right: -10,

  },
  cu: {
    position: "absolute",
  },
  cuimage: {
    position: "absolute",
    width: windowWidth + 1,
    height: windowHeight / 12,
    bottom: -25,
    left: -13,
  },
  juntos: {
    flexDirection: 'row',
  },
  icon: {
    left: 0,
  },
  header: {
    flexDirection: "row",
    width: windowWidth / 10,
  },
  title: {
    fontSize: 24,
    top: 19,
  },

  drawerStyle: {
    headerStyle: {
      backgroundColor: "#F5F5DC",
    },
    headerShown: true,
    headerTintColor: "#000",
    headerRight: () => (
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon1
            name="notifications-outline"
            size={30}
            color="#000"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    ),
  },
  perfil: {
    position: "absolute",
    left: -windowWidth / 13
  },
  perfil2: {
    left: windowWidth,
  },
  drawerPerfil: {
    drawerItemStyle: { height: 0 },
    headerStyle: {
      backgroundColor: "#F5F5DC",
    },
    headerTintColor: "#000",
    headerRight: () => (

      <View style={styles.juntos}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Octicons
              name="pencil"
              size={30}
              color="black"
              style={styles.icon} />
          </TouchableOpacity>
        </View><View style={styles.header}>
          <TouchableOpacity>
            <Icon1
              name="notifications-outline"
              size={30}
              color="#000"
              style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

    ),
  },

  drawerHistoricoAlteracao: {
    headerStyle: {
      backgroundColor: "#F5F5DC",
    },
    headerTintColor: "#000",
    headerRight: () => (
      <View style={styles.juntos}>
        <View style={styles.header}>
          <TouchableOpacity >
            <Octicons
              name="filter"
              size={30}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <TouchableOpacity>
            <Icon1
              name="notifications-outline"
              size={30}
              color="#000"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    ),
  },
});


const DrawerNavigation = ({ navigation,route }) => {

  const handleSignOut = async () => {
  };

  return (
    <Drawer.Navigator
      initialRouteName="Pagina Principal"
      screenOptions={styles.drawerStyle}
    >
      <Drawer.Screen
      name="Pagina Principal"
      initialParams={{ do: "nothing" }}
      component={load?Main:Loading}
      options={load?{ drawerItemStyle: { height: 0 } }:{ headerShown: false,drawerItemStyle: { height: 0 } }}
    />
      <Drawer.Screen name="Lista Clinicas" component={ListaClinicas} />

      <Drawer.Screen name="Clinica De Servico"
        component={Perfil}
        options={{ drawerItemStyle: { height: 0 } }}
      />

      <Drawer.Screen name="Perfil"
        component={Perfil}
        initialParams={{ docid: useriding() }}
        options={({ navigation }) => ({
          drawerItemStyle: { height: 0 },
          headerStyle: {
            backgroundColor: "#F5F5DC",
          },
          headerTintColor: "#000",
          headerRight: () => (
            <View style={styles.juntos}>
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Editar Perfil", { docid: useriding() });
                  }}
                >
                  <Octicons
                    name="pencil"
                    size={30}
                    color="black"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.header}>
                <TouchableOpacity>
                  <Icon1
                    name="notifications-outline"
                    size={30}
                    color="#000"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ),
        })}
      />
      <Drawer.Screen name="Informacao Clinica"
        component={Perfil}
        options={{ drawerItemStyle: { height: 0 } }}
      />
      <Drawer.Screen name="Calendario"
        component={Calendario}
        options={{ drawerItemStyle: { height: 0, marginTop: "-10%" } }}
      />
      <Drawer.Screen name="Historico Alteracao de Turnos"
        component={HistoricoAlteracaoTurnos}
        initialParams={{ docid: useriding() }}
        options={logged() && isadmin()?styles.hide: logged()? styles.drawerStyle : styles.hide}
      />
      <Drawer.Screen  name="Pedido Alteracao"
        component={PedidoAlteracao}
        initialParams={{ docid: useriding() }}
        options={logged() && isadmin()?styles.hide: logged()? styles.drawerStyle : styles.hide}
      />
      <Drawer.Screen
        name="Definicoes"
        component={Definicoes}
        options={logged() && isadmin()?styles.hide: logged()? styles.drawerStyle : styles.hide}
      />
      <Drawer.Screen
        name="Painel Administrador"
        component={PainelAdministrador}
        options={ styles.hide}
      />
      <Drawer.Screen
        name="Gerir Candidaturas"
        component={GerirCandidaturas}
        options={ styles.hide}
      />
      <Drawer.Screen
        name="Pedidos Pendentes"
        component={PedidosPendentes}
        initialParams={{ docid: useriding() }}
        options={logged() && isadmin()?styles.hide: logged()? styles.drawerStyle : styles.hide}
      />
      <Drawer.Screen
        name="Editar Perfil"
        initialParams={{ docid: useriding() }}
        component={EditarPerfil}
        options={styles.hide}
      />
      <Drawer.Screen
        name="Login"
        component={Login}
        options={!logged()? { headerShown: false } : styles.hide}
      />
      <Drawer.Screen
        name="Registo"
        component={Registo}
        options={!logged()? { headerShown: false } : styles.hide}
      />
      <Drawer.Screen
        name="Logout"
        component={Main}
        initialParams={{ do: "logout" }}
        options={logged()? styles.drawerStyle  : styles.hide}
      />
      <Drawer.Screen
        name="Alteracao Manual"
        component={AlteracaoManual}
        options={styles.hide}
      />
      <Drawer.Screen
        name="Historico Candidaturas"
        component={HistoricoCandidaturas}
        options={styles.hide}
      />
    </Drawer.Navigator>
  );
};

const EmptyComponent = () => {
  return <View />;
};

const EmptyComponent2 = () => {
  return <View />;
};




const TabsNavigation = ({ isLogged }) => {
  useEffect(() => {
    user = logged();
  });

  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (logged()&&load) {
            route.name === "Main"
              ? (iconName = "home")
              : route.name === "Perfil"
              ? (iconName = "user")
              : route.name === "Calendario"
              ? (iconName = "calendar")
              : null;
            if (!(route.name === "default")) {
              return (
                <View
                  style={[
                    {
                      backgroundColor: "#F3D75C",
                      width: windowWidth / 6,
                      height: windowHeight / 13,
                      borderRadius: 50,
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    route.name === "Calendario"
                      ? styles.rightIconContainer
                      : route.name === "Main"
                      ? styles.perfil
                      : route.name === "Perfil"
                      ? styles.leftIconContainer
                      : route.name === "default"
                      ? styles.cu
                      : null,
                  ]}
                >
                  <Icon name={iconName} size={size} color={"grey"} />
                </View>
              );
            } else  {
              return (
                <View>
                  <Image
                    source={require("../assets/images/wave.png")}
                    style={styles.cuimage}
                    resizeMode="stretch"
                  />
                </View>
              );
            }
          } else if(load){
            route.name === "Main" ? (iconName = "home") : null;
            if (!(route.name === "default")) {
              return (
                <View
                  style={[
                    {
                      backgroundColor: "#F3D75C",
                      width: windowWidth / 6,
                      height: windowHeight / 13,
                      borderRadius: 50,
                      justifyContent: "center",
                      alignItems: "center",
                    },

                    route.name === "Main" ? styles.perfil : styles.perfil2,
                  ]}
                >
                  <Icon name={iconName} size={size} color={"grey"} />
                </View>
              );
            } else {
              return (
                <View>
                  <Image
                    source={require("../assets/images/wave.png")}
                    style={styles.cuimage}
                    resizeMode="stretch"
                  />
                </View>
              );
            }
          }
        },
        headerShown: false,
        tabBarStyle: {
          display: route.name === "Chat" ? "none" : null,
          backgroundColor: "#F5F5DC",
          elevation: 0,
          borderTopWidth: 0,
        },

        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="default" component={DrawerNavigation} />

      <Tab.Screen
        name="Perfil"
        component={Perfil}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            if (logged()&&!isadmin()) navigation.navigate("Perfil");
            else if(logged()&&isadmin()) navigation.navigate("Painel Administrador");
          },
        }}
      />
      <Tab.Screen
        name="Empty"
        component={EmptyComponent}
        options={{
          tabBarButton: (props) => (
            <View
              style={{
                flex: 0.1,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 145,
              }}
            >
              <TouchableOpacity activeOpacity={1} style={{ width: 160 }} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Main"
        component={Main}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Pagina Principal");
          },
        }}
      />

      <Tab.Screen
        name="Empty2"
        component={EmptyComponent2}
        options={{
          tabBarButton: (props) => (
            <View
              style={{
                flex: 0.1,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 140,
              }}
            >
              <TouchableOpacity activeOpacity={1} style={{ width: 160 }} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Calendario"
        component={Calendario}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            if (logged()) navigation.navigate("Calendario");
          },
        }}
      />
    </Tab.Navigator>
  );
};
const AppNavigation = () => {

  return (
    <NavigationContainer>
      <TabsNavigation />
    </NavigationContainer>
  );
};

export default AppNavigation;
