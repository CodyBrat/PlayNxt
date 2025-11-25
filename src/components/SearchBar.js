// src/components/SearchBar.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../theme/theme';

const SearchBar = ({ value, onChangeText, placeholder = 'Search your favorite turf' }) => {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons
                name="magnify"
                size={22}
                color={theme.colors.primary}
                style={styles.icon}
            />
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.textLight}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        paddingHorizontal: theme.spacing.base,
        paddingVertical: theme.spacing.xs,
        ...theme.shadows.sm,
    },
    icon: {
        marginRight: theme.spacing.sm,
    },
    input: {
        flex: 1,
        fontSize: theme.fontSizes.base,
        fontFamily: theme.fonts.regular,
        color: theme.colors.text,
        paddingVertical: theme.spacing.sm,
    },
});

export default SearchBar;
