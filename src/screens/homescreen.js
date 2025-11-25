// src/screens/homescreen.js
import React, { useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Text } from 'react-native-paper';

import { useApp } from '../context/AppContext';
import { ActionTypes } from '../context/appReducer';
import LocationHeader from '../components/LocationHeader';
import SearchBar from '../components/SearchBar';
import SportCategoryChip from '../components/SportCategoryChip';
import VenueCard from '../components/VenueCard';
import { colors, spacing, typography } from '../theme/theme';

const SPORTS = [
  'Basketball',
  'Tennis',
  'Cricket',
  'Football',
  'Badminton',
  'Table Tennis',
  'Rugby Ball',
  'Volleyball',
];

export default function HomeScreen({ navigation }) {
  const { state, dispatch } = useApp();
  const [refreshing, setRefreshing] = useState(false);

  const { user, venues, favorites, filters } = state;
  const { selectedSport, searchQuery } = filters;

  // Filter venues based on search and sport
  const filteredVenues = venues.filter(venue => {
    const matchesSearch = venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = !selectedSport || venue.sports.includes(selectedSport);
    return matchesSearch && matchesSport;
  });

  const handleSportPress = (sport) => {
    dispatch({
      type: ActionTypes.SET_SELECTED_SPORT,
      payload: selectedSport === sport ? null : sport,
    });
  };

  const handleSearchChange = (text) => {
    dispatch({
      type: ActionTypes.SET_SEARCH_QUERY,
      payload: text,
    });
  };

  const handleFavoritePress = (venueId) => {
    dispatch({
      type: ActionTypes.TOGGLE_FAVORITE,
      payload: venueId,
    });
  };

  const handleVenuePress = (venueId) => {
    navigation.navigate('VenueDetail', { venueId });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 1000);
  };

  const renderSportCategory = ({ item }) => (
    <SportCategoryChip
      sport={item}
      isActive={selectedSport === item}
      onPress={() => handleSportPress(item)}
    />
  );

  const renderVenueCard = ({ item }) => (
    <VenueCard
      venue={item}
      isFavorite={favorites.includes(item.id)}
      onPress={() => handleVenuePress(item.id)}
      onFavoritePress={() => handleFavoritePress(item.id)}
    />
  );

  const ListHeader = () => (
    <>
      {/* Sport Categories */}
      <View style={styles.sectionContainer}>
        <FlatList
          data={SPORTS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={renderSportCategory}
          contentContainerStyle={styles.categoriesContent}
        />
      </View>

      {/* Section Title */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Nearby Turfs</Text>
        <Text style={styles.resultCount}>
          {filteredVenues.length} {filteredVenues.length === 1 ? 'result' : 'results'}
        </Text>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <LocationHeader
        location={`${user.location.city}, ${user.location.country}`}
        onLocationPress={() => { }}
        onMenuPress={() => { }}
        notificationCount={2}
      />

      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChangeText={handleSearchChange}
        onFilterPress={() => { }}
      />

      {/* Venue List */}
      <FlatList
        data={filteredVenues}
        keyExtractor={(item) => item.id}
        renderItem={renderVenueCard}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  sectionContainer: {
    marginVertical: spacing.md,
  },
  categoriesContent: {
    paddingHorizontal: spacing.base,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.text,
  },
  resultCount: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.textSecondary,
  },
});

