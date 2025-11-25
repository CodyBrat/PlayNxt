// src/components/VenueCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../theme/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - (spacing.base * 2);

export default function VenueCard({
    venue,
    isFavorite,
    onPress,
    onFavoritePress
}) {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.9}
        >
            {/* Image */}
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: venue.image }}
                    style={styles.image}
                    resizeMode="cover"
                />

                {/* Favorite Button */}
                <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={onFavoritePress}
                    activeOpacity={0.7}
                >
                    <MaterialCommunityIcons
                        name={isFavorite ? 'heart' : 'heart-outline'}
                        size={20}
                        color={isFavorite ? colors.accent : colors.white}
                    />
                </TouchableOpacity>

                {/* Price Badge */}
                <View style={styles.priceBadge}>
                    <Text style={styles.priceText}>{venue.currency}{venue.price}</Text>
                </View>
            </View>

            {/* Content */}
            <View style={styles.content}>
                {/* Title */}
                <Text style={styles.title} numberOfLines={2}>
                    {venue.name}
                </Text>

                {/* Location & Rating */}
                <View style={styles.metaRow}>
                    <View style={styles.locationContainer}>
                        <MaterialCommunityIcons
                            name="map-marker"
                            size={14}
                            color={colors.gray500}
                        />
                        <Text style={styles.location} numberOfLines={1}>
                            {venue.location}
                        </Text>
                    </View>

                    <View style={styles.ratingContainer}>
                        <MaterialCommunityIcons
                            name="star"
                            size={14}
                            color={colors.warning}
                        />
                        <Text style={styles.rating}>
                            {venue.rating} · {venue.reviews} review
                        </Text>
                    </View>
                </View>

                {/* Time */}
                <View style={styles.timeRow}>
                    <MaterialCommunityIcons
                        name="clock-outline"
                        size={14}
                        color={colors.gray500}
                    />
                    <Text style={styles.time}>{venue.availability}</Text>
                </View>

                {/* Sports Tags */}
                <View style={styles.tagsContainer}>
                    {venue.sports.slice(0, 3).map((sport, index) => (
                        <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{sport}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        backgroundColor: colors.white,
        borderRadius: borderRadius.lg,
        marginHorizontal: spacing.base,
        marginBottom: spacing.base,
        overflow: 'hidden',
        ...shadows.md,
    },
    imageContainer: {
        width: '100%',
        height: 200,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    favoriteButton: {
        position: 'absolute',
        top: spacing.md,
        left: spacing.md,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        ...shadows.sm,
    },
    priceBadge: {
        position: 'absolute',
        bottom: spacing.md,
        right: spacing.md,
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.sm,
        ...shadows.sm,
    },
    priceText: {
        fontSize: typography.fontSize.lg,
        fontFamily: typography.fontFamily.bold,
        color: colors.white,
    },
    content: {
        padding: spacing.md,
    },
    title: {
        fontSize: typography.fontSize.lg,
        fontFamily: typography.fontFamily.semiBold,
        color: colors.text,
        marginBottom: spacing.xs,
        lineHeight: typography.fontSize.lg * typography.lineHeight.tight,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.xs,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: spacing.sm,
    },
    location: {
        fontSize: typography.fontSize.sm,
        fontFamily: typography.fontFamily.regular,
        color: colors.gray500,
        marginLeft: 4,
        flex: 1,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: typography.fontSize.sm,
        fontFamily: typography.fontFamily.medium,
        color: colors.text,
        marginLeft: 4,
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    time: {
        fontSize: typography.fontSize.sm,
        fontFamily: typography.fontFamily.regular,
        color: colors.gray500,
        marginLeft: 4,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.xs,
    },
    tag: {
        backgroundColor: colors.primaryLight + '20',
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: borderRadius.sm,
    },
    tagText: {
        fontSize: typography.fontSize.xs,
        fontFamily: typography.fontFamily.medium,
        color: colors.primary,
    },
});
