// src/components/SportCategoryChip.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../theme/theme';

const sportIcons = {
    Basketball: 'basketball',
    Tennis: 'tennis',
    Cricket: 'cricket',
    Football: 'soccer',
    'Rugby Ball': 'rugby',
    Badminton: 'badminton',
    'Table Tennis': 'table-tennis',
    Volleyball: 'volleyball',
};

export default function SportCategoryChip({ sport, isActive, onPress }) {
    const iconName = sportIcons[sport] || 'soccer';

    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.container}
            activeOpacity={0.7}
        >
            <View style={[styles.iconContainer, isActive && styles.iconContainerActive]}>
                <MaterialCommunityIcons
                    name={iconName}
                    size={28}
                    color={isActive ? colors.white : colors.primary}
                />
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>
                {sport}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginRight: spacing.base,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.xs,
        borderWidth: 2,
        borderColor: colors.primary,
        ...shadows.sm,
    },
    iconContainerActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
        ...shadows.md,
    },
    label: {
        fontSize: typography.fontSize.xs,
        fontFamily: typography.fontFamily.medium,
        color: colors.text,
        textAlign: 'center',
    },
    labelActive: {
        color: colors.primary,
        fontFamily: typography.fontFamily.semiBold,
    },
});
