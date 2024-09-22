import React from 'react';
import BottomTab from './src/navigation/bottomTabNavigator'
import { listenToUpdates, prencher } from "./src/services/firebase.js";


const App = () => {
    prencher();
    listenToUpdates();
return(
    <BottomTab/>
);
}

export default App;
