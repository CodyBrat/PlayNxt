import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { sportsCategories } from '../data/sportsCategories';
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

  console.log('🏠 HomeScreen - Total venues in state:', state.venues?.length);
  console.log('🏠 HomeScreen - Filtered venues:', filteredVenues.length);
  console.log('🏠 HomeScreen - Selected sport:', state.selectedSport);
  console.log('🏠 HomeScreen - Search query:', state.searchQuery);

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
    <View style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryDark]}
        style={styles.headerGradient}
      >
        <SafeAreaView edges={['top']}>
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Hello 👋</Text>
              <Text style={styles.headerTitle}>Find Your Perfect Turf</Text>
            </View>
          </View>

          {/* Search Bar */}
          <View style={styles.searchSection}>
            <SearchBar
              value={state.searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search turfs, locations..."
            />
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Sport Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sport Categories</Text>
            {state.selectedSport && (
              <TouchableOpacity onPress={() => setSelectedSport(null)}>
                <Text style={styles.clearText}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>
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
            <Text style={styles.sectionTitle}>
              {state.selectedSport ? `${state.selectedSport} Venues` : 'Venues Near You'}
            </Text>
            <Text style={styles.countText}>{filteredVenues.length} found</Text>
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
              <Text style={styles.emptyIcon}>🔍</Text>
              <Text style={styles.emptyTitle}>No venues found</Text>
              <Text style={styles.emptyText}>
                Try adjusting your filters or search query
              </Text>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => {
                  setSelectedSport(null);
                  setSearchQuery('');
                }}
              >
                <Text style={styles.clearButtonText}>Clear All Filters</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerGradient: {
    paddingBottom: theme.spacing.xl,
  },
  header: {
    paddingHorizontal: theme.spacing.base,
    paddingTop: theme.spacing.base,
  },
  greeting: {
    fontSize: theme.fontSizes.base,
    fontFamily: theme.fonts.regular,
    color: theme.colors.secondary,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: theme.fontSizes['3xl'],
    fontFamily: theme.fonts.bold,
    color: theme.colors.secondary,
  },
  searchSection: {
    paddingHorizontal: theme.spacing.base,
    paddingTop: theme.spacing.lg,
  },
  scrollContent: {
    paddingTop: theme.spacing.base,
    paddingBottom: theme.spacing['3xl'],
  },
  section: {
    marginBottom: theme.spacing.xl,
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
  },
  countText: {
    fontSize: theme.fontSizes.sm,
    fontFamily: theme.fonts.medium,
    color: theme.colors.textSecondary,
  },
  clearText: {
    fontSize: theme.fontSizes.sm,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.primary,
  },
  categoriesContainer: {
    paddingHorizontal: theme.spacing.base,
    gap: theme.spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing['4xl'],
    paddingHorizontal: theme.spacing.base,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: theme.spacing.base,
  },
  emptyTitle: {
    fontSize: theme.fontSizes.xl,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  emptyText: {
    fontSize: theme.fontSizes.base,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  clearButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  clearButtonText: {
    fontSize: theme.fontSizes.base,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.secondary,
  },
});
