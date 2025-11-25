// src/components/VenueCard.js
import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../theme/theme';

const VenueCard = ({ venue, onPress, isFavorite, onToggleFavorite }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Image source={{ uri: venue.image }} style={styles.image} />

            <TouchableOpacity
                style={styles.favoriteButton}
                onPress={(e) => {
                    e.stopPropagation();
                    onToggleFavorite?.();
                }}
                activeOpacity={0.7}
            >
                <MaterialCommunityIcons
                    name={isFavorite ? 'heart' : 'heart-outline'}
                    size={24}
                    color={isFavorite ? theme.colors.error : theme.colors.surface}
                />
            </TouchableOpacity>

            <View style={styles.ratingBadge}>
                <MaterialCommunityIcons name="star" size={14} color="#FFB800" />
                <Text style={styles.rating}>{venue.rating.toFixed(1)}</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.name} numberOfLines={1}>
                    {venue.name}
                </Text>
                <Text style={styles.location} numberOfLines={1}>
                    {venue.shortLocation}
                </Text>
                <View style={styles.footer}>
                    <Text style={styles.price}>
                        ₹ {venue.price.toLocaleString()}
                        <Text style={styles.priceUnit}> / {venue.priceUnit}</Text>
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        overflow: 'hidden',
        marginBottom: theme.spacing.base,
        ...theme.shadows.md,
    },
    image: {
        width: '100%',
        height: 180,
        backgroundColor: theme.colors.border,
    },
    favoriteButton: {
        position: 'absolute',
        top: theme.spacing.md,
        right: theme.spacing.md,
        width: 36,
        height: 36,
        borderRadius: theme.borderRadius.full,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ratingBadge: {
        position: 'absolute',
        top: theme.spacing.md,
        left: theme.spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: 4,
        borderRadius: theme.borderRadius.sm,
        gap: 4,
    },
    rating: {
        fontSize: theme.fontSizes.sm,
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.text,
    },
    content: {
        padding: theme.spacing.md,
    },
    name: {
        fontSize: theme.fontSizes.lg,
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.text,
        marginBottom: 4,
    },
    location: {
        fontSize: theme.fontSizes.sm,
        fontFamily: theme.fonts.regular,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.sm,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: theme.fontSizes.lg,
        fontFamily: theme.fonts.bold,
        color: theme.colors.text,
    },
    priceUnit: {
        fontSize: theme.fontSizes.sm,
        fontFamily: theme.fonts.regular,
        color: theme.colors.textSecondary,
    },
});

export default VenueCard;
