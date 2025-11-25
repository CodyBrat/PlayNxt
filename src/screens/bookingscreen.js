// src/screens/BookingScreen.js
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import { useApp } from '../context/AppContext';
import theme from '../theme/theme';
import SlotPicker from '../components/SlotPicker';
import CustomButton from '../components/CustomButton';

export default function BookingScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { venue } = route.params;
    const { addBooking } = useApp();

    const [selectedDate, setSelectedDate] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('morning');
    const [selectedSlot, setSelectedSlot] = useState(null);

    const today = new Date().toISOString().split('T')[0];

    const handleDateSelect = (day) => {
        setSelectedDate(day.dateString);
        setSelectedSlot(null);
    };

    const availableSlots = selectedDate
        ? venue.availableSlots[selectedDate] || []
        : [];

    const handleConfirmBooking = () => {
        if (!selectedDate || !selectedSlot) {
            Alert.alert('Incomplete Selection', 'Please select a date and time slot');
            return;
        }

        const booking = {
            venueId: venue.id,
            venueName: venue.name,
            venueImage: venue.image,
            date: selectedDate,
            time: selectedSlot,
            duration: venue.priceUnit,
            price: venue.price,
        };

        addBooking(booking);

        Alert.alert(
            'Booking Confirmed! 🎉',
            `Your slot at ${venue.name} on ${selectedDate} at ${selectedSlot} has been booked successfully.`,
            [
                {
                    text: 'View Bookings',
                    onPress: () => navigation.navigate('MyBookings'),
                },
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('Home'),
                },
            ]
        );
    };

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
                <Text style={styles.headerTitle}>Book Your Slot</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Calendar */}
                <View style={styles.section}>
                    <Calendar
                        minDate={today}
                        onDayPress={handleDateSelect}
                        markedDates={{
                            [selectedDate]: {
                                selected: true,
                                selectedColor: theme.colors.primary,
                            },
                        }}
                        theme={{
                            backgroundColor: theme.colors.surface,
                            calendarBackground: theme.colors.surface,
                            selectedDayBackgroundColor: theme.colors.primary,
                            selectedDayTextColor: theme.colors.secondary,
                            todayTextColor: theme.colors.primary,
                            dayTextColor: theme.colors.text,
                            textDisabledColor: theme.colors.textLight,
                            monthTextColor: theme.colors.text,
                            textMonthFontFamily: theme.fonts.bold,
                            textDayFontFamily: theme.fonts.regular,
                            textDayHeaderFontFamily: theme.fonts.medium,
                            textMonthFontSize: 18,
                            textDayFontSize: 14,
                            arrowColor: theme.colors.primary,
                        }}
                    />
                </View>

                {/* Pick a Slot */}
                {selectedDate && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Pick a Slot</Text>
                        <SlotPicker
                            selectedCategory={selectedCategory}
                            onSelectCategory={setSelectedCategory}
                            availableSlots={availableSlots}
                            selectedSlot={selectedSlot}
                            onSelectSlot={setSelectedSlot}
                        />
                    </View>
                )}

                {/* Selected Info */}
                {selectedDate && selectedSlot && (
                    <View style={styles.selectedInfo}>
                        <Text style={styles.selectedInfoTitle}>Your Selection</Text>
                        <View style={styles.infoRow}>
                            <MaterialCommunityIcons
                                name="calendar"
                                size={20}
                                color={theme.colors.textSecondary}
                            />
                            <Text style={styles.infoText}>{selectedDate}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <MaterialCommunityIcons
                                name="clock-outline"
                                size={20}
                                color={theme.colors.textSecondary}
                            />
                            <Text style={styles.infoText}>{selectedSlot}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <MaterialCommunityIcons
                                name="currency-inr"
                                size={20}
                                color={theme.colors.textSecondary}
                            />
                            <Text style={styles.infoText}>₹{venue.price.toLocaleString()}</Text>
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* Bottom Button */}
            <View style={styles.bottomBar}>
                <CustomButton
                    title="Continue"
                    onPress={handleConfirmBooking}
                    size="large"
                    disabled={!selectedDate || !selectedSlot}
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
    section: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.base,
        marginBottom: theme.spacing.md,
    },
    sectionTitle: {
        fontSize: theme.fontSizes.lg,
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },
    selectedInfo: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.base,
        marginHorizontal: theme.spacing.base,
        marginBottom: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
        ...theme.shadows.md,
    },
    selectedInfoTitle: {
        fontSize: theme.fontSizes.base,
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
        marginBottom: theme.spacing.sm,
    },
    infoText: {
        fontSize: theme.fontSizes.base,
        fontFamily: theme.fonts.regular,
        color: theme.colors.text,
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
