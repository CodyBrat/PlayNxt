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

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    // simple spinner while fonts load
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  // tweak the MD3 theme for PlayNxt branding
  const theme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: '#0D47A1',
      secondary: '#FF6F00',
    },
  };

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <MainScreen />
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