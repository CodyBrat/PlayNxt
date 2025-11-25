// src/components/LocationHeader.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, spacing, shadows } from '../theme/theme';

export default function LocationHeader({ location = 'London, England', onLocationPress, onMenuPress, notificationCount = 0 }) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                <View style={styles.header}>
                    {/* Menu Icon */}
                    <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
                        <MaterialCommunityIcons name="menu" size={24} color={colors.white} />
                    </TouchableOpacity>

                    {/* Location */}
                    <TouchableOpacity onPress={onLocationPress} style={styles.locationContainer}>
                        <Text style={styles.locationLabel}>My Location</Text>
                        <View style={styles.locationRow}>
                            <Text style={styles.locationText} numberOfLines={1}>{location}</Text>
                            <MaterialCommunityIcons name="chevron-down" size={20} color={colors.white} />
                        </View>
                    </TouchableOpacity>

                    {/* Notification Icon */}
                    <TouchableOpacity style={styles.iconButton}>
                        <MaterialCommunityIcons name="bell-outline" size={24} color={colors.white} />
                        {notificationCount > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{notificationCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        ...shadows.sm,
    },
    safeArea: {
        backgroundColor: colors.primary,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.md,
    },
    iconButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    locationContainer: {
        flex: 1,
        marginHorizontal: spacing.md,
    },
    locationLabel: {
        fontSize: typography.fontSize.xs,
        fontFamily: typography.fontFamily.regular,
        color: colors.white,
        opacity: 0.8,
        marginBottom: 2,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        fontSize: typography.fontSize.base,
        fontFamily: typography.fontFamily.semiBold,
        color: colors.white,
        marginRight: 4,
        flex: 1,
    },
    badge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: colors.accent,
        borderRadius: 10,
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        fontSize: 10,
        fontFamily: typography.fontFamily.bold,
        color: colors.white,
    },
});
