import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, AppState, Platform, AppRegistry} from 'react-native';
import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
});

export const pushCalendarNotificationsAsync = async (appointment) => {
    Notifications.scheduleNotificationAsync({
        content: {
        title: 'You have your '+ appointment.title + ' today!',
        body: 'Check your calendar to see if you have any other upcoming events',
        },
        trigger: { 
        hour:9,
        },
        
    }).catch((err) => {
        console.log("Got error: ", err);
    });

    Notifications.requestPermissionsAsync().then((status) => {
    if (status.granted) {
        console.log('Notification permissions granted.');
    } else {
        console.log('Notification permissions denied.');
    }
    }).catch((err) => {
    console.log("Got error: ", err);
    });
};
