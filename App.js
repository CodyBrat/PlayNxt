// App.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Provider as PaperProvider,
  MD3LightTheme,
  Appbar,
  Button,
  Card,
  FAB,
  ActivityIndicator,
  Text,
} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import Navigation from './src/navigation/navigation';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2E7D32',     // main green (PlayNxt)
    secondary: '#C8E6C9',   // light green accents
    background: '#F1F8F6',  // soft background
  },
};

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <Navigation />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

function MainScreen() {
  return (
    <View style={styles.container}>
      <Appbar.Header elevated>
        <Appbar.Content title="PlayNxt" subtitle="Book. Play. Connect." />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>

      <View style={styles.content}>
        <Text variant="titleLarge" style={{ marginBottom: 8 }}>
          Nearby Turfs
        </Text>

        <Card mode="elevated" style={{ marginBottom: 12 }}>
          <Card.Title title="Downtown Turf" subtitle="5-a-side · ₹600/hr" />
          <Card.Cover source={{ uri: 'https://picsum.photos/700/300' }} />
          <Card.Actions>
            <Button mode="contained" onPress={() => {}}>
              Book Now
            </Button>
            <Button onPress={() => {}}>Details</Button>
          </Card.Actions>
        </Card>
      </View>

      <FAB style={styles.fab} icon="plus" onPress={() => {}} label="Create Match" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16 },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 18,
  },
});