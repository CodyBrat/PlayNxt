// src/screens/homescreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { sportsCategories } from '../data/mockData';
import theme from '../theme/theme';
import SearchBar from '../components/SearchBar';
import SportCategoryCard from '../components/SportCategoryCard';
import VenueCard from '../components/VenueCard';

export default function HomeScreen() {
  const navigation = useNavigation();
  const {
    state,
    setSearchQuery,
    setSelectedSport,
    getFilteredVenues,
    toggleFavorite,
    isFavorite,
  } = useApp();

  const filteredVenues = getFilteredVenues();

  const handleSportPress = (sportName) => {
    if (state.selectedSport === sportName) {
      setSelectedSport(null);
    } else {
      setSelectedSport(sportName);
    }
  };

  const handleVenuePress = (venue) => {
    navigation.navigate('TurfDetails', { venue });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
        <View style={styles.section}>
          <SearchBar
            value={state.searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search your favorite turf"
          />
        </View>

        {/* Sport Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Turf Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {sportsCategories.map((sport) => (
              <SportCategoryCard
                key={sport.id}
                sport={sport}
                isSelected={state.selectedSport === sport.name}
                onPress={() => handleSportPress(sport.name)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Turfs Near You */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Turfs near you</Text>
            <TouchableOpacity onPress={() => { }}>
              <Text style={styles.viewAll}>View All →</Text>
            </TouchableOpacity>
          </View>

          {filteredVenues.length > 0 ? (
            filteredVenues.map((venue) => (
              <VenueCard
                key={venue.id}
                venue={venue}
                onPress={() => handleVenuePress(venue)}
                isFavorite={isFavorite(venue.id)}
                onToggleFavorite={() => toggleFavorite(venue.id)}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                No turfs found matching your criteria
              </Text>
              <TouchableOpacity onPress={() => setSelectedSport(null)}>
                <Text style={styles.clearFilter}>Clear Filters</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Explore by Areas */}
        <View style={[styles.section, styles.exploreSection]}>
          <Text style={styles.sectionTitle}>Explore by areas</Text>
          <Text style={styles.comingSoon}>Coming soon...</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingBottom: theme.spacing['2xl'],
  },
  section: {
    paddingTop: theme.spacing.base,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.xl,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.base,
    marginBottom: theme.spacing.md,
  },
  viewAll: {
    fontSize: theme.fontSizes.sm,
    fontFamily: theme.fonts.medium,
    color: theme.colors.primary,
  },
  categoriesContainer: {
    paddingHorizontal: theme.spacing.base,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing['3xl'],
  },
  emptyText: {
    fontSize: theme.fontSizes.base,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  clearFilter: {
    fontSize: theme.fontSizes.base,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.primary,
  },
  exploreSection: {
    paddingHorizontal: theme.spacing.base,
    marginTop: theme.spacing.xl,
  },
  comingSoon: {
    fontSize: theme.fontSizes.base,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textLight,
    fontStyle: 'italic',
  },
});
