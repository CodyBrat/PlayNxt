// src/screens/TurfDetailsScreen.js
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import theme from '../theme/theme';
import FacilityIcon from '../components/FacilityIcon';
import CustomButton from '../components/CustomButton';

export default function TurfDetailsScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { venue } = route.params;

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={24}
                        color={theme.colors.text}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Turf Details</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Image */}
                <Image source={{ uri: venue.image }} style={styles.image} />

                {/* Content */}
                <View style={styles.content}>
                    {/* Name and Rating */}
                    <View style={styles.titleSection}>
                        <View style={styles.titleRow}>
                            <Text style={styles.name}>{venue.name}</Text>
                            <View style={styles.ratingBadge}>
                                <MaterialCommunityIcons name="star" size={16} color="#FFB800" />
                                <Text style={styles.rating}>{venue.rating.toFixed(1)}</Text>
                            </View>
                        </View>
                        <Text style={styles.location}>{venue.location}</Text>
                    </View>

                    {/* Price */}
                    <View style={styles.priceSection}>
                        <Text style={styles.price}>
                            ₹ {venue.price.toLocaleString()}
                            <Text style={styles.priceUnit}> / {venue.priceUnit}</Text>
                        </Text>
                    </View>

                    {/* About */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>About {venue.name.split(' ')[0]}</Text>
                        <Text style={styles.about}>{venue.about}</Text>
                    </View>

                    {/* Facilities */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Facilities</Text>
                        <View style={styles.facilitiesGrid}>
                            {venue.facilities.map((facility) => (
                                <FacilityIcon key={facility.id} facility={facility} />
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Button */}
            <View style={styles.bottomBar}>
                <CustomButton
                    title="Check Slot Availability"
                    onPress={() => navigation.navigate('Booking', { venue })}
                    size="large"
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.base,
        paddingVertical: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        ...theme.shadows.sm,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: theme.fontSizes.lg,
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.text,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    image: {
        width: '100%',
        height: 280,
        backgroundColor: theme.colors.border,
    },
    content: {
        backgroundColor: theme.colors.surface,
        marginTop: -theme.spacing.xl,
        borderTopLeftRadius: theme.borderRadius.xl,
        borderTopRightRadius: theme.borderRadius.xl,
        padding: theme.spacing.base,
    },
    titleSection: {
        marginBottom: theme.spacing.base,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.sm,
    },
    name: {
        flex: 1,
        fontSize: theme.fontSizes['2xl'],
        fontFamily: theme.fonts.bold,
        color: theme.colors.text,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: theme.colors.background,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
    },
    rating: {
        fontSize: theme.fontSizes.base,
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.text,
    },
    location: {
        fontSize: theme.fontSizes.base,
        fontFamily: theme.fonts.regular,
        color: theme.colors.textSecondary,
    },
    priceSection: {
        paddingVertical: theme.spacing.base,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: theme.colors.divider,
        marginBottom: theme.spacing.base,
    },
    price: {
        fontSize: theme.fontSizes['2xl'],
        fontFamily: theme.fonts.bold,
        color: theme.colors.text,
    },
    priceUnit: {
        fontSize: theme.fontSizes.base,
        fontFamily: theme.fonts.regular,
        color: theme.colors.textSecondary,
    },
    section: {
        marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
        fontSize: theme.fontSizes.lg,
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },
    about: {
        fontSize: theme.fontSizes.base,
        fontFamily: theme.fonts.regular,
        color: theme.colors.textSecondary,
        lineHeight: 24,
    },
    facilitiesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing.base,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.base,
        ...theme.shadows.lg,
    },
});
