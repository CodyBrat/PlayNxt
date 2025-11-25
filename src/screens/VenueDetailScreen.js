// src/screens/VenueDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { ActionTypes } from '../context/appReducer';
import { colors, spacing, typography, borderRadius, shadows } from '../theme/theme';

const { width } = Dimensions.get('window');

export default function VenueDetailScreen({ route, navigation }) {
    const { venueId } = route.params;
    const { state, dispatch } = useApp();

    const venue = state.venues.find(v => v.id === venueId);
    const isFavorite = state.favorites.includes(venueId);

    if (!venue) {
        return (
            <View style={styles.container}>
                <Text>Venue not found</Text>
            </View>
        );
    }

    const handleFavoritePress = () => {
        dispatch({
            type: ActionTypes.TOGGLE_FAVORITE,
            payload: venueId,
        });
    };

    const handleBookNow = () => {
        // Navigate to booking flow (to be implemented)
        alert('Booking flow coming soon!');
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Image */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: venue.image }} style={styles.image} />

                    {/* Back Button */}
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
                    </TouchableOpacity>

                    {/* Favorite Button */}
                    <TouchableOpacity
                        style={styles.favoriteButton}
                        onPress={handleFavoritePress}
                    >
                        <MaterialCommunityIcons
                            name={isFavorite ? 'heart' : 'heart-outline'}
                            size={24}
                            color={isFavorite ? colors.accent : colors.text}
                        />
                    </TouchableOpacity>

                    {/* On-ground Staff Badge */}
                    {venue.isOnGroundStaff && (
                        <View style={styles.staffBadge}>
                            <MaterialCommunityIcons name="check-circle" size={16} color={colors.success} />
                            <Text style={styles.staffBadgeText}>100% on-ground staff vaccinated</Text>
                        </View>
                    )}
                </View>

                {/* Content */}
                <View style={styles.content}>
                    {/* Title */}
                    <Text style={styles.title}>{venue.name}</Text>

                    {/* Location & Rating */}
                    <View style={styles.metaRow}>
                        <View style={styles.locationContainer}>
                            <MaterialCommunityIcons name="map-marker" size={16} color={colors.gray500} />
                            <Text style={styles.location}>{venue.location}</Text>
                        </View>

                        <View style={styles.ratingContainer}>
                            <MaterialCommunityIcons name="star" size={16} color={colors.warning} />
                            <Text style={styles.rating}>{venue.rating}</Text>
                            <Text style={styles.reviews}> · {venue.reviews} review</Text>
                        </View>
                    </View>

                    {/* Price */}
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceLabel}>Price</Text>
                        <Text style={styles.price}>{venue.currency}{venue.price}</Text>
                    </View>

                    {/* Availability */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Availability</Text>
                        <View style={styles.availabilityCard}>
                            <MaterialCommunityIcons name="clock-outline" size={20} color={colors.primary} />
                            <Text style={styles.availabilityText}>{venue.availability}</Text>
                        </View>
                    </View>

                    {/* Sport Types */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Sport type</Text>
                        <View style={styles.sportTypes}>
                            {venue.sports.map((sport, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.sportChip,
                                        index === 0 && styles.sportChipActive
                                    ]}
                                >
                                    <Text style={[
                                        styles.sportChipText,
                                        index === 0 && styles.sportChipTextActive
                                    ]}>
                                        {sport}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Amenities */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Amenities</Text>
                        <View style={styles.amenities}>
                            {venue.amenities.map((amenity, index) => (
                                <View key={index} style={styles.amenityItem}>
                                    <MaterialCommunityIcons name="check" size={16} color={colors.success} />
                                    <Text style={styles.amenityText}>{amenity}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Bar */}
            <SafeAreaView edges={['bottom']} style={styles.bottomBar}>
                <View style={styles.bottomContent}>
                    <View>
                        <Text style={styles.bottomPriceLabel}>Total</Text>
                        <Text style={styles.bottomPrice}>{venue.currency}{venue.price}</Text>
                    </View>
                    <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
                        <Text style={styles.bookButtonText}>Book Now</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    imageContainer: {
        width: '100%',
        height: 300,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: spacing.base,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...shadows.md,
    },
    favoriteButton: {
        position: 'absolute',
        top: 50,
        right: spacing.base,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...shadows.md,
    },
    staffBadge: {
        position: 'absolute',
        bottom: spacing.base,
        left: spacing.base,
        right: spacing.base,
        backgroundColor: colors.white,
        borderRadius: borderRadius.sm,
        padding: spacing.sm,
        flexDirection: 'row',
        alignItems: 'center',
        ...shadows.sm,
    },
    staffBadgeText: {
        fontSize: typography.fontSize.xs,
        fontFamily: typography.fontFamily.medium,
        color: colors.text,
        marginLeft: spacing.xs,
    },
    content: {
        padding: spacing.base,
    },
    title: {
        fontSize: typography.fontSize['2xl'],
        fontFamily: typography.fontFamily.semiBold,
        color: colors.text,
        marginBottom: spacing.sm,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.base,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    location: {
        fontSize: typography.fontSize.sm,
        fontFamily: typography.fontFamily.regular,
        color: colors.gray500,
        marginLeft: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: typography.fontSize.base,
        fontFamily: typography.fontFamily.semiBold,
        color: colors.text,
        marginLeft: 4,
    },
    reviews: {
        fontSize: typography.fontSize.sm,
        fontFamily: typography.fontFamily.regular,
        color: colors.gray500,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.primaryLight + '15',
        padding: spacing.base,
        borderRadius: borderRadius.md,
        marginBottom: spacing.lg,
    },
    priceLabel: {
        fontSize: typography.fontSize.base,
        fontFamily: typography.fontFamily.medium,
        color: colors.text,
    },
    price: {
        fontSize: typography.fontSize['2xl'],
        fontFamily: typography.fontFamily.bold,
        color: colors.primary,
    },
    section: {
        marginBottom: spacing.lg,
    },
    sectionTitle: {
        fontSize: typography.fontSize.lg,
        fontFamily: typography.fontFamily.semiBold,
        color: colors.text,
        marginBottom: spacing.md,
    },
    availabilityCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.gray100,
        padding: spacing.base,
        borderRadius: borderRadius.md,
    },
    availabilityText: {
        fontSize: typography.fontSize.base,
        fontFamily: typography.fontFamily.medium,
        color: colors.text,
        marginLeft: spacing.sm,
    },
    sportTypes: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
    sportChip: {
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.full,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.white,
    },
    sportChipActive: {
        backgroundColor: colors.success,
        borderColor: colors.success,
    },
    sportChipText: {
        fontSize: typography.fontSize.sm,
        fontFamily: typography.fontFamily.medium,
        color: colors.text,
    },
    sportChipTextActive: {
        color: colors.white,
    },
    amenities: {
        gap: spacing.sm,
    },
    amenityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.gray100,
        padding: spacing.md,
        borderRadius: borderRadius.md,
    },
    amenityText: {
        fontSize: typography.fontSize.base,
        fontFamily: typography.fontFamily.regular,
        color: colors.text,
        marginLeft: spacing.sm,
    },
    bottomBar: {
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        ...shadows.lg,
    },
    bottomContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.base,
    },
    bottomPriceLabel: {
        fontSize: typography.fontSize.sm,
        fontFamily: typography.fontFamily.regular,
        color: colors.gray500,
    },
    bottomPrice: {
        fontSize: typography.fontSize.xl,
        fontFamily: typography.fontFamily.bold,
        color: colors.primary,
    },
    bookButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: spacing['2xl'],
        paddingVertical: spacing.md,
        borderRadius: borderRadius.md,
        ...shadows.md,
    },
    bookButtonText: {
        fontSize: typography.fontSize.base,
        fontFamily: typography.fontFamily.semiBold,
        color: colors.white,
    },
});
