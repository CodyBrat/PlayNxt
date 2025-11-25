// src/screens/profilescreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { colors, spacing, typography, borderRadius, shadows } from '../theme/theme';

export default function ProfileScreen() {
  const { state } = useApp();
  const { user, bookings } = state;

  const stats = [
    { label: 'Bookings', value: bookings.upcoming.length + bookings.past.length, icon: 'calendar-check' },
    { label: 'Favorites', value: state.favorites.length, icon: 'heart' },
    { label: 'Reviews', value: '0', icon: 'star' },
  ];

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
  };

  const handlePaymentMethods = () => {
    Alert.alert('Payment Methods', 'Manage your payment methods here');
  };

  const handleNotifications = () => {
    Alert.alert('Notifications', 'Notification settings coming soon!');
  };

  const handlePrivacy = () => {
    Alert.alert('Privacy & Security', 'Privacy settings coming soon!');
  };

  const handleHelp = () => {
    Alert.alert('Help & Support', 'Need help? Contact us at support@playnxt.com');
  };

  const handleAbout = () => {
    Alert.alert('About PlayNxt', 'PlayNxt v1.0.0\n\nBook. Play. Connect.\n\n© 2023 PlayNxt. All rights reserved.');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => Alert.alert('Logged Out', 'You have been logged out successfully')
        },
      ]
    );
  };

  const menuItems = [
    { label: 'Edit Profile', icon: 'account-edit', onPress: handleEditProfile },
    { label: 'Payment Methods', icon: 'credit-card', onPress: handlePaymentMethods },
    { label: 'Notifications', icon: 'bell', onPress: handleNotifications },
    { label: 'Privacy & Security', icon: 'shield-check', onPress: handlePrivacy },
    { label: 'Help & Support', icon: 'help-circle', onPress: handleHelp },
    { label: 'About', icon: 'information', onPress: handleAbout },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* User Info Card */}
        <View style={styles.userCard}>
          <Image
            source={{ uri: user.avatar }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>

          <View style={styles.locationRow}>
            <MaterialCommunityIcons name="map-marker" size={16} color={colors.gray500} />
            <Text style={styles.locationText}>
              {user.location.city}, {user.location.country}
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <MaterialCommunityIcons name={stat.icon} size={24} color={colors.primary} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconContainer}>
                  <MaterialCommunityIcons name={item.icon} size={20} color={colors.primary} />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color={colors.gray400} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={20} color={colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
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
  userCard: {
    backgroundColor: colors.white,
    margin: spacing.base,
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    ...shadows.base,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: spacing.md,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  userName: {
    fontSize: typography.fontSize['2xl'],
    fontFamily: typography.fontFamily.semiBold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  userEmail: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.gray500,
    marginBottom: spacing.sm,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  locationText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.gray500,
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: spacing.base,
    marginBottom: spacing.base,
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    padding: spacing.base,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    ...shadows.sm,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: typography.fontSize['2xl'],
    fontFamily: typography.fontFamily.bold,
    color: colors.text,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.regular,
    color: colors.gray500,
  },
  menuContainer: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.base,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  menuLabel: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.text,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    marginHorizontal: spacing.base,
    marginTop: spacing.base,
    padding: spacing.base,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.error,
  },
  logoutText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.error,
    marginLeft: spacing.sm,
  },
  footer: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  version: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.gray400,
  },
});
