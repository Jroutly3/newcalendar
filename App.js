import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import dateFns from 'date-fns';



const format = (date = new Date()) => dateFns.format(date, 'YYYY-MM-DD');

export default function App() {
  const baseDate = new Date(2022, 3, 16); //Will change to get date soon
  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => {
          console.log('selected day', day);
        }}
        current={format(baseDate)}
        minDate={dateFns.subYears(baseDate, 1)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
