import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar, CalendarList } from 'react-native-calendars';
import dateFns from 'date-fns';
import * as Notifications from 'expo-notifications';
import { pushCalendarNotificationsAsync } from './notifications'; 


const format = (date = new Date()) => dateFns.format(date, 'YYYY-MM-DD');
const getMarkedDates = (baseDate, appointments) => {
  const markedDates = {};

  markedDates[baseDate] = { selected: true };

  appointments.forEach((appointment) => {
    const formattedDate = new Date(appointment.date);
    markedDates[formattedDate] = {
      ...markedDates[formattedDate],
      marked: true,
    };

    const curr_date = new Date()

    if (curr_date.toISOString().substring(0,10) == appointment.date.substring(0,10)){
      pushCalendarNotificationsAsync(appointment)
    }
    
  });

  return markedDates;
};

export default () => {
  const baseDate = new Date(2023, 2, 22);
  const APPOINTMENTS = [
    {
      date: '2023-03-13T05:00:00.000Z',
      title: "It's a past thing!",
    },
    {
      date: '2023-03-22T05:00:00.000Z',
      title: "It's a today thing!",
    },
    {
      date: '2023-04-15T05:00:00.000Z',
      title: "It's a future thing!",
    },
    {
      date: '2023-03-25T05:00:00.000Z',
      title: "CS 2200 Exam",
    }
  ];

  return (
    <View style={styles.container}>
      <Calendar
        current={baseDate}
        onDayPress={(day) => {
          console.log('selected day', day);
        }}
        markedDates={getMarkedDates(baseDate, APPOINTMENTS)}
        theme={{
          calendarBackground: '#166088',

          selectedDayBackgroundColor: '#C0D6DF',
          selectedDayTextColor: '#166088',
          selectedDotColor: '#166088',

          dayTextColor: '#DBE9EE',
          textDisabledColor: '#729DAF',
          dotColor: '#DBE9EE',

          monthTextColor: '#DBE9EE',
          textMonthFontWeight: 'bold',

          arrowColor: '#DBE9EE',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#166088',
    justifyContent: 'center',
  },
});