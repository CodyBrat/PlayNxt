import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function BookingScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">My Bookings</Text>
      <Text>No bookings yet. Let’s get you on the field!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
