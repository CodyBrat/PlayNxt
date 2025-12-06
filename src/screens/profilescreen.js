import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import theme from '../theme/theme';

export default function ProfileScreen() {
    const { user: authUser, logout } = useAuth();
    const { state } = useApp();
    const user = authUser || state.user;

    if (!user) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: () => logout()
                },
            ]
        );
    };

    const menuItems = [
        {
            id: '1',
            icon: 'account-edit-outline',
            label: 'Edit Profile',
            color: theme.colors.text,
            onPress: () => { },
        },
        {
            id: '2',
            icon: 'heart-outline',
            label: 'My Favorites',
            count: state.favorites.length,
            color: theme.colors.text,
            onPress: () => { },
        },
        {
            id: '3',
            icon: 'wallet-outline',
            label: 'Payment Methods',
            color: theme.colors.text,
            onPress: () => { },
        },
        {
            id: '4',
            icon: 'cog-outline',
            label: 'Settings',
            color: theme.colors.text,
            onPress: () => { },
        },
        {
            id: '5',
            icon: 'help-circle-outline',
            label: 'Help & Support',
            color: theme.colors.text,
            onPress: () => { },
        },
        {
            id: '6',
            icon: 'logout',
            label: 'Logout',
            color: theme.colors.error,
            onPress: handleLogout,
        },
    ];

    return (
        <View style={styles.container}>
            {/* Header with Gradient */}
            <LinearGradient
                colors={[theme.colors.primary, theme.colors.primaryDark]}
                style={styles.headerGradient}
            >
                <SafeAreaView edges={['top']}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Profile</Text>
                        <TouchableOpacity style={styles.editButton}>
                            <MaterialCommunityIcons
                                name="pencil-outline"
                                size={20}
                                color={theme.colors.secondary}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Profile Info */}
                    <View style={styles.profileSection}>
                        <View style={styles.avatarContainer}>
                            <Image source={{ uri: user.avatar }} style={styles.avatar} />
                            <View style={styles.verifiedBadge}>
                                <MaterialCommunityIcons
                                    name="check-decagram"
                                    size={20}
                                    color={theme.colors.primary}
                                />
                            </View>
                        </View>
                        <Text style={styles.name}>{user.name}</Text>
                        <Text style={styles.email}>{user.email}</Text>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <View style={styles.statIconCircle}>
                            <MaterialCommunityIcons
                                name="calendar-check"
                                size={24}
                                color={theme.colors.primary}
                            />
                        </View>
                        <Text style={styles.statValue}>{user.totalBookings}</Text>
                        <Text style={styles.statLabel}>Bookings</Text>
                    </View>
                    <View style={styles.statCard}>
                        <View style={styles.statIconCircle}>
                            <MaterialCommunityIcons
                                name="heart"
                                size={24}
                                color="#FF6B6B"
                            />
                        </View>
                        <Text style={styles.statValue}>{state.favorites.length}</Text>
                        <Text style={styles.statLabel}>Favorites</Text>
                    </View>
                    <View style={styles.statCard}>
                        <View style={styles.statIconCircle}>
                            <MaterialCommunityIcons
                                name="trophy"
                                size={24}
                                color="#FFB800"
                            />
                        </View>
                        <Text style={styles.statValue}>15</Text>
                        <Text style={styles.statLabel}>Rewards</Text>
                    </View>
                </View>

                {/* Menu Items */}
                <View style={styles.menuContainer}>
                    <Text style={styles.menuSectionTitle}>Account</Text>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                styles.menuItem,
                                index === menuItems.length - 1 && styles.menuItemLast,
                            ]}
                            onPress={item.onPress}
                            activeOpacity={0.7}
                        >
                            <View style={styles.menuLeft}>
                                <View
                                    style={[
                                        styles.menuIconCircle,
                                        item.color === theme.colors.error && styles.menuIconCircleError,
                                    ]}
                                >
                                    <MaterialCommunityIcons
                                        name={item.icon}
                                        size={20}
                                        color={item.color}
                                    />
                                </View>
                                <Text style={[styles.menuLabel, { color: item.color }]}>
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
                                    size={20}
                                    color={theme.colors.textLight}
                                />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* App Version */}
                <Text style={styles.version}>PlayNxt v1.0.0</Text>
                <Text style={styles.copyright}>© 2025 PlayNxt. All rights reserved.</Text>
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
        paddingBottom: theme.spacing['2xl'],
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.base,
        paddingTop: theme.spacing.base,
        marginBottom: theme.spacing.lg,
    },
    headerTitle: {
        fontSize: theme.fontSizes['2xl'],
        fontFamily: theme.fonts.bold,
        color: theme.colors.secondary,
    },
    editButton: {
        width: 40,
        height: 40,
        borderRadius: theme.borderRadius.md,
        backgroundColor: 'rgba(26, 29, 41, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileSection: {
        alignItems: 'center',
        paddingHorizontal: theme.spacing.base,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: theme.spacing.md,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: theme.borderRadius.full,
        backgroundColor: theme.colors.surface,
        borderWidth: 4,
        borderColor: theme.colors.secondary,
    },
    verifiedBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.full,
        padding: 2,
    },
    name: {
        fontSize: theme.fontSizes['2xl'],
        fontFamily: theme.fonts.bold,
        color: theme.colors.secondary,
        marginBottom: 4,
    },
    email: {
        fontSize: theme.fontSizes.base,
        fontFamily: theme.fonts.regular,
        color: theme.colors.secondary,
        opacity: 0.8,
    },
    scrollContent: {
        paddingBottom: theme.spacing['3xl'],
    },
    statsContainer: {
        flexDirection: 'row',
        gap: theme.spacing.md,
        paddingHorizontal: theme.spacing.base,
        marginTop: theme.spacing.base,
        marginBottom: theme.spacing.xl,
    },
    statCard: {
        flex: 1,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.base,
        alignItems: 'center',
        ...theme.shadows.sm,
    },
    statIconCircle: {
        width: 48,
        height: 48,
        borderRadius: theme.borderRadius.full,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.sm,
    },
    statValue: {
        fontSize: theme.fontSizes['2xl'],
        fontFamily: theme.fonts.bold,
        color: theme.colors.text,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: theme.fontSizes.xs,
        fontFamily: theme.fonts.medium,
        color: theme.colors.textSecondary,
    },
    menuContainer: {
        backgroundColor: theme.colors.surface,
        marginHorizontal: theme.spacing.base,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.sm,
        ...theme.shadows.sm,
    },
    menuSectionTitle: {
        fontSize: theme.fontSizes.base,
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.textSecondary,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        marginBottom: 4,
    },
    menuItemLast: {
        marginBottom: 0,
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
    },
    menuIconCircle: {
        width: 44,
        height: 44,
        borderRadius: theme.borderRadius.md,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuIconCircleError: {
        backgroundColor: theme.colors.error + '15',
    },
    menuLabel: {
        fontSize: theme.fontSizes.base,
        fontFamily: theme.fonts.medium,
    },
    menuRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    badge: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: 3,
        borderRadius: theme.borderRadius.full,
        minWidth: 24,
        alignItems: 'center',
    },
    badgeText: {
        fontSize: 11,
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.secondary,
    },
    version: {
        fontSize: theme.fontSizes.sm,
        fontFamily: theme.fonts.medium,
        color: theme.colors.textLight,
        textAlign: 'center',
        marginTop: theme.spacing['2xl'],
    },
    copyright: {
        fontSize: theme.fontSizes.xs,
        fontFamily: theme.fonts.regular,
        color: theme.colors.textLight,
        textAlign: 'center',
        marginTop: theme.spacing.xs,
    },
});
