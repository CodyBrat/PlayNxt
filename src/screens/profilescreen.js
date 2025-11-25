// src/screens/profilescreen.js
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

export default function ProfileScreen() {
    const { state } = useApp();
    const user = state.user;

    if (!user) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    const menuItems = [
        {
            id: '1',
            icon: 'account-edit-outline',
            label: 'Edit Profile',
            onPress: () => { },
        },
        {
            id: '2',
            icon: 'heart-outline',
            label: 'My Favorites',
            count: state.favorites.length,
            onPress: () => { },
        },
        {
            id: '3',
            icon: 'cog-outline',
            label: 'Settings',
            onPress: () => { },
        },
        {
            id: '4',
            icon: 'help-circle-outline',
            label: 'Help & Support',
            onPress: () => { },
        },
        {
            id: '5',
            icon: 'logout',
            label: 'Logout',
            color: theme.colors.error,
            onPress: () => { },
        },
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Profile Header */}
                <View style={styles.header}>
                    <Image source={{ uri: user.avatar }} style={styles.avatar} />
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.email}>{user.email}</Text>
                </View>

                {/* Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <MaterialCommunityIcons
                            name="calendar-check"
                            size={32}
                            color={theme.colors.primary}
                        />
                        <Text style={styles.statValue}>{user.totalBookings}</Text>
                        <Text style={styles.statLabel}>Total Bookings</Text>
                    </View>
                    <View style={styles.statCard}>
                        <MaterialCommunityIcons
                            name="heart"
                            size={32}
                            color={theme.colors.error}
                        />
                        <Text style={styles.statValue}>{state.favorites.length}</Text>
                        <Text style={styles.statLabel}>Favorites</Text>
                    </View>
                </View>

                {/* Menu Items */}
                <View style={styles.menuContainer}>
                    {menuItems.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.menuItem}
                            onPress={item.onPress}
                            activeOpacity={0.7}
                        >
                            <View style={styles.menuLeft}>
                                <MaterialCommunityIcons
                                    name={item.icon}
                                    size={24}
                                    color={item.color || theme.colors.text}
                                />
                                <Text
                                    style={[
                                        styles.menuLabel,
                                        item.color && { color: item.color },
                                    ]}
                                >
                                    {item.label}
                                </Text>
                            </View>
                            <View style={styles.menuRight}>
                                {item.count !== undefined && (
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>{item.count}</Text>
                                    </View>
                                )}
                                <MaterialCommunityIcons
                                    name="chevron-right"
                                    size={24}
                                    color={theme.colors.textLight}
                                />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* App Version */}
                <Text style={styles.version}>Version 1.0.0</Text>
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
    header: {
        backgroundColor: theme.colors.surface,
        alignItems: 'center',
        paddingVertical: theme.spacing['2xl'],
        marginBottom: theme.spacing.base,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: theme.borderRadius.full,
        marginBottom: theme.spacing.base,
        backgroundColor: theme.colors.primary,
    },
    name: {
        fontSize: theme.fontSizes['2xl'],
        fontFamily: theme.fonts.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    email: {
        fontSize: theme.fontSizes.base,
        fontFamily: theme.fonts.regular,
        color: theme.colors.textSecondary,
    },
    statsContainer: {
        flexDirection: 'row',
        gap: theme.spacing.base,
        paddingHorizontal: theme.spacing.base,
        marginBottom: theme.spacing.base,
    },
    statCard: {
        flex: 1,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.base,
        alignItems: 'center',
        ...theme.shadows.sm,
    },
    statValue: {
        fontSize: theme.fontSizes['2xl'],
        fontFamily: theme.fonts.bold,
        color: theme.colors.text,
        marginTop: theme.spacing.sm,
    },
    statLabel: {
        fontSize: theme.fontSizes.sm,
        fontFamily: theme.fonts.regular,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs,
    },
    menuContainer: {
        backgroundColor: theme.colors.surface,
        marginHorizontal: theme.spacing.base,
        borderRadius: theme.borderRadius.lg,
        overflow: 'hidden',
        ...theme.shadows.sm,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: theme.spacing.base,
        paddingHorizontal: theme.spacing.base,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.divider,
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
    },
    menuLabel: {
        fontSize: theme.fontSizes.base,
        fontFamily: theme.fonts.medium,
        color: theme.colors.text,
    },
    menuRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    badge: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: 2,
        borderRadius: theme.borderRadius.full,
        minWidth: 24,
        alignItems: 'center',
    },
    badgeText: {
        fontSize: theme.fontSizes.xs,
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.secondary,
    },
    version: {
        fontSize: theme.fontSizes.sm,
        fontFamily: theme.fonts.regular,
        color: theme.colors.textLight,
        textAlign: 'center',
        marginTop: theme.spacing.xl,
    },
});
