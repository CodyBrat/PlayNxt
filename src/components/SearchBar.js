// src/components/SearchBar.js
import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../theme/theme';

export default function SearchBar({
    value,
    onChangeText,
    onFilterPress,
    placeholder = 'Search turfs...'
}) {
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <MaterialCommunityIcons
                    name="magnify"
                    size={20}
                    color={colors.gray400}
                    style={styles.searchIcon}
                />
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor={colors.gray400}
                    value={value}
                    onChangeText={onChangeText}
                />
            </View>

            <TouchableOpacity onPress={onFilterPress} style={styles.filterButton}>
                <MaterialCommunityIcons name="tune-variant" size={20} color={colors.primary} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.sm,
        gap: spacing.sm,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        ...shadows.sm,
    },
    searchIcon: {
        marginRight: spacing.sm,
    },
    input: {
        flex: 1,
        fontSize: typography.fontSize.base,
        fontFamily: typography.fontFamily.regular,
        color: colors.text,
        paddingVertical: spacing.xs,
    },
    filterButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: borderRadius.md,
        ...shadows.sm,
    },
});
