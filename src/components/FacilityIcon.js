// src/components/FacilityIcon.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../theme/theme';

const FacilityIcon = ({ facility }) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconCircle}>
                <MaterialCommunityIcons
                    name={facility.icon}
                    size={24}
                    color={theme.colors.primary}
                />
            </View>
            <Text style={styles.label}>{facility.name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: 80,
    },
    iconCircle: {
        width: 56,
        height: 56,
        borderRadius: theme.borderRadius.full,
        backgroundColor: theme.colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.sm,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    label: {
        fontSize: theme.fontSizes.xs,
        fontFamily: theme.fonts.medium,
        color: theme.colors.text,
        textAlign: 'center',
    },
});

export default FacilityIcon;
