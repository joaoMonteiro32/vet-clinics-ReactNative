import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import {
  collection,
  getDocs,
  doc,
  getFirestore,
} from "firebase/firestore";
import {calendar} from "../../services/firebase.js"
let clinica=[];
const Calendario = () => {

  const [selectedDate, setSelectedDate] = useState(new Date());
  clinica=calendar(selectedDate.getDate(),selectedDate.getMonth(),selectedDate.getFullYear());

  const markedDates = {
    [selectedDate.toISOString().split('T')[0]]: {
      customStyles: {
        container: {
          backgroundColor: '#1a82eb',
          borderRadius: 20,
        },
        text: {
          color: 'white',
        },
      },
    },
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => setSelectedDate(new Date(day.timestamp))}
        style={styles.calendar}
        markedDates={markedDates}
        markingType={'custom'}
      />
      <View style={styles.box}>
        <Text style={styles.boxTitle}>{selectedDate.toDateString()}</Text>
        <Text style={styles.boxContent}>{clinica.data.nome}</Text>
        <Text style={styles.boxContent}>{clinica.data.telefone}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#F5F5DC',
    paddingHorizontal: 15,
  },
  calendar: {
    marginBottom: 10,
  },
  box: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFF',
    alignItems: 'center',
    marginHorizontal: 20,
    borderColor: '#888',
    borderWidth: 1,
    margin: 20,
    
  },
  boxTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  boxContent: {
    fontSize: 18,
    marginTop: 5,
  },
});

export default Calendario;
