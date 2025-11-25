// App.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Provider as PaperProvider,
  MD3LightTheme,
  ActivityIndicator,
} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import {
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import Navigation from './src/navigation/navigation';
import { AppProvider } from './src/context/AppContext';
import { colors } from './src/theme/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color={colors.primary} />;
  }

  const theme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: colors.primary,
      secondary: colors.accent,
      background: colors.background,
      surface: colors.surface,
      text: colors.text,
    },
    fonts: {
      ...MD3LightTheme.fonts,
      regular: {
        fontFamily: 'Inter_400Regular',
      },
      medium: {
        fontFamily: 'Inter_500Medium',
      },
      bold: {
        fontFamily: 'Inter_700Bold',
      },
    },
  };

  return (
    <SafeAreaProvider>
      <AppProvider>
        <PaperProvider theme={theme}>
          <Navigation />
        </PaperProvider>
      </AppProvider>
    </SafeAreaProvider>
  );
}


function MainScreen() {
  return (
    <View style={styles.container}>
      <Appbar.Header elevated>
        <Appbar.Content title="PlayNxt" subtitle="Book. Play. Connect." />
        <Appbar.Action icon="magnify" onPress={() => { }} />
      </Appbar.Header>

      <View style={styles.content}>
        <Text variant="titleLarge" style={{ marginBottom: 8 }}>
          Nearby Turfs
        </Text>

        <Card mode="elevated" style={{ marginBottom: 12 }}>
          <Card.Title title="Downtown Turf" subtitle="5-a-side · ₹600/hr" />
          <Card.Cover source={{ uri: 'https://picsum.photos/700/300' }} />
          <Card.Actions>
            <Button mode="contained" onPress={() => { }}>
              Book Now
            </Button>
            <Button onPress={() => { }}>Details</Button>
          </Card.Actions>
        </Card>
      </View>

      <FAB style={styles.fab} icon="plus" onPress={() => { }} label="Create Match" />
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