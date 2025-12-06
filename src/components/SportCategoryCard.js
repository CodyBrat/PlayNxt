import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../theme/theme';

const SportCategoryCard = ({ sport, isSelected, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.container, isSelected && styles.selected]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            {isSelected ? (
                <LinearGradient
                    colors={[theme.colors.primary, theme.colors.primaryDark]}
                    style={styles.gradient}
                >
                    {sport.trending && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>🔥 Hot</Text>
                        </View>
                    )}
                    <View style={styles.content}>
                        <MaterialCommunityIcons
                            name={sport.icon}
                            size={36}
                            color={theme.colors.secondary}
                        />
                        <Text style={styles.nameSelected}>{sport.name}</Text>
                    </View>
                </LinearGradient>
            ) : (
                <View style={styles.normalContent}>
                    {sport.trending && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>🔥 Hot</Text>
                        </View>
                    )}
                    <View style={styles.content}>
                        <MaterialCommunityIcons
                            name={sport.icon}
                            size={36}
                            color={theme.colors.surface}
                        />
                        <Text style={styles.name}>{sport.name}</Text>
                    </View>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 120,
        height: 120,
        borderRadius: theme.borderRadius.xl,
        overflow: 'hidden',
        ...theme.shadows.md,
    },
    selected: {
        ...theme.shadows.lg,
        transform: [{ scale: 1.02 }],
    },
    gradient: {
        flex: 1,
        position: 'relative',
    },
    normalContent: {
        flex: 1,
        backgroundColor: theme.colors.secondary,
        position: 'relative',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    badge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: theme.colors.surface,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: theme.borderRadius.sm,
        zIndex: 1,
    },
    badgeText: {
        fontSize: 9,
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.secondary,
    },
    name: {
        fontSize: theme.fontSizes.sm,
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.surface,
        textAlign: 'center',
    },
    nameSelected: {
        fontSize: theme.fontSizes.sm,
        fontFamily: theme.fonts.bold,
        color: theme.colors.secondary,
        textAlign: 'center',
    },
});

export default SportCategoryCard;
