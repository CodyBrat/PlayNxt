// src/components/SportCategoryCard.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../theme/theme';

const SportCategoryCard = ({ sport, isSelected, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.container, isSelected && styles.selected]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            {sport.trending && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>Trending</Text>
                </View>
            )}
            <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                    name={sport.icon}
                    size={48}
                    color={theme.colors.surface}
                />
            </View>
            <Text style={styles.name}>{sport.name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 110,
        height: 110,
        backgroundColor: theme.colors.secondary,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        marginRight: theme.spacing.md,
        justifyContent: 'center',
        alignItems: 'center',
        ...theme.shadows.md,
    },
    selected: {
        backgroundColor: theme.colors.secondaryLight,
        borderWidth: 2,
        borderColor: theme.colors.primary,
    },
    badge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: theme.colors.surface,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: theme.borderRadius.sm,
    },
    badgeText: {
        fontSize: 9,
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.secondary,
    },
    iconContainer: {
        marginBottom: theme.spacing.xs,
    },
    name: {
        fontSize: theme.fontSizes.sm,
        fontFamily: theme.fonts.medium,
        color: theme.colors.surface,
        textAlign: 'center',
    },
});

export default SportCategoryCard;
