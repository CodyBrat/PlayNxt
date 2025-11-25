// src/screens/MyBookingsScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import theme from '../theme/theme';

export default function MyBookingsScreen() {
  const { getActiveBookings, getPastBookings, cancelBooking } = useApp();

  const activeBookings = getActiveBookings();
  const pastBookings = getPastBookings();

  const handleCancelBooking = (bookingId) => {
    cancelBooking(bookingId);
  };

  const renderBookingCard = (booking, isPast = false) => (
    <View key={booking.id} style={styles.bookingCard}>
      <Image source={{ uri: booking.venueImage }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.venueName}>{booking.venueName}</Text>
        <View style={styles.infoRow}>
          <MaterialCommunityIcons
            name="calendar"
            size={16}
            color={theme.colors.textSecondary}
          />
          <Text style={styles.infoText}>{booking.date}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={16}
            color={theme.colors.textSecondary}
          />
          <Text style={styles.infoText}>
            {booking.time} • {booking.duration}
          </Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.price}>₹{booking.price.toLocaleString()}</Text>
          {!isPast && booking.status === 'confirmed' && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => handleCancelBooking(booking.id)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          )}
          {booking.status === 'cancelled' && (
            <View style={styles.cancelledBadge}>
              <Text style={styles.cancelledText}>Cancelled</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Active Bookings */}
        {activeBookings.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Active Bookings</Text>
            {activeBookings.map((booking) => renderBookingCard(booking))}
          </View>
        )}

        {/* Past Bookings */}
        {pastBookings.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Past Bookings</Text>
            {pastBookings.map((booking) => renderBookingCard(booking, true))}
          </View>
        )}

        {/* Empty State */}
        {activeBookings.length === 0 && pastBookings.length === 0 && (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="calendar-blank-outline"
              size={80}
              color={theme.colors.textLight}
            />
            <Text style={styles.emptyTitle}>No bookings yet</Text>
            <Text style={styles.emptyText}>
              Let's get you on the field! Browse turfs and book your slot.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.base,
    backgroundColor: theme.colors.surface,
    ...theme.shadows.sm,
  },
  headerTitle: {
    fontSize: theme.fontSizes['2xl'],
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
  },
  scrollContent: {
    padding: theme.spacing.base,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.lg,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  bookingCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
    ...theme.shadows.md,
  },
  image: {
    width: '100%',
    height: 120,
    backgroundColor: theme.colors.border,
  },
  cardContent: {
    padding: theme.spacing.md,
  },
  venueName: {
    fontSize: theme.fontSizes.lg,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  infoText: {
    fontSize: theme.fontSizes.sm,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  price: {
    fontSize: theme.fontSizes.xl,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
  },
  cancelButton: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.base,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.error,
  },
  cancelText: {
    fontSize: theme.fontSizes.sm,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.error,
  },
  cancelledBadge: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.base,
    backgroundColor: theme.colors.divider,
    borderRadius: theme.borderRadius.md,
  },
  cancelledText: {
    fontSize: theme.fontSizes.sm,
    fontFamily: theme.fonts.medium,
    color: theme.colors.textLight,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing['4xl'],
  },
  emptyTitle: {
    fontSize: theme.fontSizes.xl,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
    marginTop: theme.spacing.base,
    marginBottom: theme.spacing.sm,
  },
  emptyText: {
    fontSize: theme.fontSizes.base,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: theme.spacing['2xl'],
  },
});
