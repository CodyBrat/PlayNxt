// src/screens/bookingscreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { colors, spacing, typography, borderRadius, shadows } from '../theme/theme';

export default function BookingScreen() {
  const { state } = useApp();
  const [selectedTab, setSelectedTab] = useState('upcoming');

  const bookings = selectedTab === 'upcoming'
    ? state.bookings.upcoming
    : state.bookings.past;

  const renderBookingCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Image source={{ uri: item.venueImage }} style={styles.venueImage} />

        <View style={styles.details}>
          <Text style={styles.venueName} numberOfLines={2}>{item.venueName}</Text>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="calendar" size={14} color={colors.gray500} />
            <Text style={styles.infoText}>{item.date}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="clock-outline" size={14} color={colors.gray500} />
            <Text style={styles.infoText}>{item.time}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="badminton" size={14} color={colors.primary} />
            <Text style={styles.sportText}>{item.sport}</Text>
          </View>

          <Text style={styles.price}>₹{item.price}</Text>
        </View>
      </View>

      {selectedTab === 'upcoming' && (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Reschedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
            <Text style={[styles.actionButtonText, styles.cancelText]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <MaterialCommunityIcons
        name={selectedTab === 'upcoming' ? 'calendar-blank' : 'history'}
        size={80}
        color={colors.gray300}
      />
      <Text style={styles.emptyTitle}>
        {selectedTab === 'upcoming' ? 'No Upcoming Bookings' : 'No Past Bookings'}
      </Text>
      <Text style={styles.emptyText}>
        {selectedTab === 'upcoming'
          ? "Let's get you on the field!"
          : 'Your booking history will appear here'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
      </View>

      {/* Segmented Control */}
      <View style={styles.segmentedControl}>
        <TouchableOpacity
          style={[styles.segment, selectedTab === 'upcoming' && styles.segmentActive]}
          onPress={() => setSelectedTab('upcoming')}
        >
          <Text style={[styles.segmentText, selectedTab === 'upcoming' && styles.segmentTextActive]}>
            Upcoming
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.segment, selectedTab === 'past' && styles.segmentActive]}
          onPress={() => setSelectedTab('past')}
        >
          <Text style={[styles.segmentText, selectedTab === 'past' && styles.segmentTextActive]}>
            Past
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bookings List */}
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={renderBookingCard}
        ListEmptyComponent={EmptyState}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary
  },
  header: {
    padding: spacing.base,
    backgroundColor: colors.white,
    ...shadows.sm,
  },
  headerTitle: {
    fontSize: typography.fontSize['3xl'],
    fontFamily: typography.fontFamily.semiBold,
    color: colors.text,
  },
  segmentedControl: {
    flexDirection: 'row',
    margin: spacing.base,
    backgroundColor: colors.gray100,
    borderRadius: borderRadius.md,
    padding: 4,
  },
  segment: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: borderRadius.sm,
  },
  segmentActive: {
    backgroundColor: colors.white,
    ...shadows.sm,
  },
  segmentText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.gray500,
  },
  segmentTextActive: {
    color: colors.primary,
    fontFamily: typography.fontFamily.semiBold,
  },
  listContent: {
    padding: spacing.base,
    flexGrow: 1,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.base,
    overflow: 'hidden',
    ...shadows.base,
  },
  cardContent: {
    flexDirection: 'row',
    padding: spacing.md,
  },
  venueImage: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.md,
    marginRight: spacing.md,
  },
  details: {
    flex: 1,
  },
  venueName: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.gray500,
    marginLeft: 6,
  },
  sportText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.primary,
    marginLeft: 6,
  },
  price: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.primary,
  },
  cancelButton: {
    borderColor: colors.error,
  },
  cancelText: {
    color: colors.error,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing['4xl'],
  },
  emptyTitle: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.text,
    marginTop: spacing.base,
    marginBottom: spacing.xs,
  },
  emptyText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
