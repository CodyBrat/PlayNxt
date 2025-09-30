import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Welcome to PlayNxt</Text>
      <Text variant="bodyLarge" style={{ marginVertical: 8 }}>
        Discover and book nearby turfs instantly.
      </Text>
      <Button mode="contained" onPress={() => {}}>Search Turfs</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
});
