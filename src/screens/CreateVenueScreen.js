import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { venueAPI } from '../services/api';
import { sportsCategories } from '../data/sportsCategories';
import theme from '../theme/theme';
import CustomButton from '../components/CustomButton';

export default function CreateVenueScreen() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        shortLocation: '',
        sport: 'Football',
        type: '',
        price: '',
        priceUnit: '60 minutes',
        about: '',
        contactPhone: '',
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Venue name is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
            newErrors.price = 'Valid price is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreate = async () => {
        if (!validate()) {
            Alert.alert('Validation Error', 'Please fill in all required fields correctly');
            return;
        }

        try {
            setLoading(true);
            const venueData = {
                ...formData,
                price: Number(formData.price),
                shortLocation: formData.shortLocation || formData.location,
                facilities: [
                    { name: 'Parking', icon: 'car' },
                    { name: 'Water', icon: 'water' },
                ],
                availableSlots: {},
                rating: 0,
                reviews: 0,
            };

            await venueAPI.createVenue(venueData);

            Alert.alert(
                'Success! 🎉',
                'Your venue has been created successfully',
                [
                    {
                        text: 'View My Venues',
                        onPress: () => navigation.navigate('MyVenues'),
                    },
                ]
            );
        } catch (error) {
            console.error('Create venue error:', error);
            Alert.alert('Error', error.response?.data?.error || 'Failed to create venue');
        } finally {
            setLoading(false);
        }
    };

    const InputField = ({ label, value, onChangeText, placeholder, error, keyboardType, multiline }) => (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>{label} {label.includes('*') ? '' : '*'}</Text>
            <TextInput
                style={[styles.input, multiline && styles.textArea, error && styles.inputError]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.textLight}
                keyboardType={keyboardType || 'default'}
                multiline={multiline}
                numberOfLines={multiline ? 4 : 1}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );

    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name="arrow-left" size={24} color={theme.colors.text} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Create Venue</Text>
                    <View style={{ width: 24 }} />
                </View>
            </SafeAreaView>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.flex}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <Text style={styles.sectionTitle}>Basic Information</Text>

                    <InputField
                        label="Venue Name *"
                        value={formData.name}
                        onChangeText={(text) => setFormData({ ...formData, name: text })}
                        placeholder="e.g., GreenKick Arena"
                        error={errors.name}
                    />

                    <InputField
                        label="Full Address *"
                        value={formData.location}
                        onChangeText={(text) => setFormData({ ...formData, location: text })}
                        placeholder="Plot 12, Road 5, Dhanmondi, Dhaka 1209"
                        error={errors.location}
                        multiline
                    />

                    <InputField
                        label="Short Location"
                        value={formData.shortLocation}
                        onChangeText={(text) => setFormData({ ...formData, shortLocation: text })}
                        placeholder="e.g., Dhanmondi, Dhaka"
                    />

                    <Text style={styles.sectionTitle}>Venue Details</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Sport Type *</Text>
                        <View style={styles.sportTags}>
                            {sportsCategories.map((sport) => (
                                <TouchableOpacity
                                    key={sport.id}
                                    style={[
                                        styles.sportTag,
                                        formData.sport === sport.name && styles.sportTagActive,
                                    ]}
                                    onPress={() => setFormData({ ...formData, sport: sport.name })}
                                >
                                    <Text
                                        style={[
                                            styles.sportTagText,
                                            formData.sport === sport.name && styles.sportTagTextActive,
                                        ]}
                                    >
                                        {sport.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <InputField
                        label="Venue Type"
                        value={formData.type}
                        onChangeText={(text) => setFormData({ ...formData, type: text })}
                        placeholder="e.g., 5-a-side, 7-a-side, Full size"
                    />

                    <View style={styles.row}>
                        <View style={[styles.inputGroup, styles.flex]}>
                            <Text style={styles.label}>Price *</Text>
                            <TextInput
                                style={[styles.input, errors.price && styles.inputError]}
                                value={formData.price}
                                onChangeText={(text) => setFormData({ ...formData, price: text })}
                                placeholder="3000"
                                keyboardType="numeric"
                                placeholderTextColor={theme.colors.textLight}
                            />
                            {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}
                        </View>

                        <View style={[styles.inputGroup, styles.flex]}>
                            <Text style={styles.label}>Price Unit</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.priceUnit}
                                onChangeText={(text) => setFormData({ ...formData, priceUnit: text })}
                                placeholder="60 minutes"
                                placeholderTextColor={theme.colors.textLight}
                            />
                        </View>
                    </View>

                    <InputField
                        label="About Venue"
                        value={formData.about}
                        onChangeText={(text) => setFormData({ ...formData, about: text })}
                        placeholder="Describe your venue, facilities, and what makes it special..."
                        multiline
                    />

                    <InputField
                        label="Contact Phone"
                        value={formData.contactPhone}
                        onChangeText={(text) => setFormData({ ...formData, contactPhone: text })}
                        placeholder="+91 98765 43210"
                        keyboardType="phone-pad"
                    />

                    <View style={styles.bottomPadding} />
                </ScrollView>
            </KeyboardAvoidingView>

            <View style={styles.footer}>
                <CustomButton
                    title={loading ? 'Creating...' : 'Create Venue'}
                    onPress={handleCreate}
                    disabled={loading}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    safeArea: {
        backgroundColor: theme.colors.surface,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.base,
        paddingVertical: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    headerTitle: {
        fontSize: theme.fontSizes.xl,
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.text,
    },
    flex: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: theme.spacing.base,
    },
    sectionTitle: {
        fontSize: theme.fontSizes.lg,
        fontFamily: theme.fonts.bold,
        color: theme.colors.text,
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.md,
    },
    inputGroup: {
        marginBottom: theme.spacing.base,
    },
    label: {
        fontSize: theme.fontSizes.sm,
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    input: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        fontSize: theme.fontSizes.base,
        color: theme.colors.text,
        fontFamily: theme.fonts.regular,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    inputError: {
        borderColor: '#EF4444',
    },
    errorText: {
        fontSize: theme.fontSizes.xs,
        color: '#EF4444',
        marginTop: 4,
        fontFamily: theme.fonts.regular,
    },
    sportTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing.sm,
    },
    sportTag: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.full,
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    sportTagActive: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    sportTagText: {
        fontSize: theme.fontSizes.sm,
        fontFamily: theme.fonts.medium,
        color: theme.colors.textSecondary,
    },
    sportTagTextActive: {
        color: theme.colors.secondary,
    },
    row: {
        flexDirection: 'row',
        gap: theme.spacing.md,
    },
    bottomPadding: {
        height: theme.spacing.xxl,
    },
    footer: {
        padding: theme.spacing.base,
        backgroundColor: theme.colors.surface,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    },
});
