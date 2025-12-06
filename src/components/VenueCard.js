import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../theme/theme';

const VenueCard = ({ venue, onPress, isFavorite, onToggleFavorite }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.9}
        >
            <View style={styles.imageContainer}>
                <Image source={{ uri: venue.image }} style={styles.image} />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.7)']}
                    style={styles.gradient}
                />

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
                        size={22}
                        color={isFavorite ? '#FF6B6B' : theme.colors.surface}
                    />
                </TouchableOpacity>

                <View style={styles.ratingBadge}>
                    <MaterialCommunityIcons name="star" size={12} color="#FFB800" />
                    <Text style={styles.rating}>{venue.rating.toFixed(1)}</Text>
                </View>

                <View style={styles.typeChip}>
                    <Text style={styles.typeText}>{venue.type}</Text>
                </View>
            </View>

            <View style={styles.content}>
                <Text style={styles.name} numberOfLines={1}>
                    {venue.name}
                </Text>
                <View style={styles.locationRow}>
                    <MaterialCommunityIcons
                        name="map-marker-outline"
                        size={14}
                        color={theme.colors.textSecondary}
                    />
                    <Text style={styles.location} numberOfLines={1}>
                        {venue.shortLocation}
                    </Text>
                </View>
                <View style={styles.footer}>
                    <View>
                        <Text style={styles.priceLabel}>Price</Text>
                        <Text style={styles.price}>
                            ₹{venue.price.toLocaleString()}
                            <Text style={styles.priceUnit}>/{venue.priceUnit}</Text>
                        </Text>
                    </View>
                    <View style={styles.bookButton}>
                        <Text style={styles.bookButtonText}>Book Now</Text>
                        <MaterialCommunityIcons
                            name="arrow-right"
                            size={16}
                            color={theme.colors.secondary}
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.xl,
        overflow: 'hidden',
        marginHorizontal: theme.spacing.base,
        marginBottom: theme.spacing.lg,
        ...theme.shadows.lg,
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 200,
    },
    image: {
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors.border,
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '50%',
    },
    favoriteButton: {
        position: 'absolute',
        top: theme.spacing.md,
        right: theme.spacing.md,
        width: 40,
        height: 40,
        borderRadius: theme.borderRadius.full,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    ratingBadge: {
        position: 'absolute',
        top: theme.spacing.md,
        left: theme.spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: 6,
        borderRadius: theme.borderRadius.md,
        gap: 4,
        ...theme.shadows.sm,
    },
    rating: {
        fontSize: 11,
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.text,
    },
    typeChip: {
        position: 'absolute',
        bottom: theme.spacing.md,
        left: theme.spacing.md,
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: 6,
        borderRadius: theme.borderRadius.md,
    },
    typeText: {
        fontSize: theme.fontSizes.xs,
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.secondary,
    },
    content: {
        padding: theme.spacing.base,
    },
    name: {
        fontSize: theme.fontSizes.lg,
        fontFamily: theme.fonts.bold,
        color: theme.colors.text,
        marginBottom: 6,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: theme.spacing.md,
    },
    location: {
        flex: 1,
        fontSize: theme.fontSizes.sm,
        fontFamily: theme.fonts.regular,
        color: theme.colors.textSecondary,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: theme.spacing.sm,
    },
    priceLabel: {
        fontSize: theme.fontSizes.xs,
        fontFamily: theme.fonts.regular,
        color: theme.colors.textLight,
        marginBottom: 2,
    },
    price: {
        fontSize: theme.fontSizes.xl,
        fontFamily: theme.fonts.bold,
        color: theme.colors.text,
    },
    priceUnit: {
        fontSize: theme.fontSizes.sm,
        fontFamily: theme.fonts.regular,
        color: theme.colors.textSecondary,
    },
    bookButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.base,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
    },
    bookButtonText: {
        fontSize: theme.fontSizes.sm,
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.secondary,
    },
});

export default VenueCard;
