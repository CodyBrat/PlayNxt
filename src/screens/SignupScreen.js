import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import theme from '../theme/theme';

export default function SignupScreen({ navigation }) {
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState('USER');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = async () => {
        if (!name || !email || !password) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        setIsLoading(true);
        const result = await register({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim() || undefined,
            password,
            role,
        });
        setIsLoading(false);

        if (result.success) {
            Alert.alert(
                'Welcome!🎉',
                `Account created successfully! You're now logged in as ${role === 'PROVIDER' ? 'a Turf Owner' : 'a Customer'}.`,
                [{ text: 'Get Started', onPress: () => { } }]
            );
        } else {
            Alert.alert('Signup Failed', result.error);
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.safeArea}>
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
            </SafeAreaView>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.formContainer}>
                        <Text style={styles.title}>Create Account</Text>
                        <Text style={styles.subtitle}>
                            Sign up to start booking amazing turfs
                        </Text>

                        {/* Role Selection */}
                        <View style={styles.roleContainer}>
                            <Text style={styles.roleLabel}>I am a:</Text>
                            <View style={styles.roleButtons}>
                                <TouchableOpacity
                                    style={[styles.roleButton, role === 'USER' && styles.roleButtonActive]}
                                    onPress={() => setRole('USER')}
                                    activeOpacity={0.7}
                                >
                                    <MaterialCommunityIcons
                                        name="account"
                                        size={20}
                                        color={role === 'USER' ? theme.colors.secondary : theme.colors.textSecondary}
                                    />
                                    <Text style={[styles.roleButtonText, role === 'USER' && styles.roleButtonTextActive]}>
                                        Customer
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.roleButton, role === 'PROVIDER' && styles.roleButtonActive]}
                                    onPress={() => setRole('PROVIDER')}
                                    activeOpacity={0.7}
                                >
                                    <MaterialCommunityIcons
                                        name="store"
                                        size={20}
                                        color={role === 'PROVIDER' ? theme.colors.secondary : theme.colors.textSecondary}
                                    />
                                    <Text style={[styles.roleButtonText, role === 'PROVIDER' && styles.roleButtonTextActive]}>
                                        Turf Owner
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Name Input */}
                        <View style={styles.inputContainer}>
                            <MaterialCommunityIcons
                                name="account-outline"
                                size={20}
                                color={theme.colors.textSecondary}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Full Name *"
                                placeholderTextColor={theme.colors.textLight}
                                value={name}
                                onChangeText={setName}
                                autoCapitalize="words"
                            />
                        </View>

                        {/* Email Input */}
                        <View style={styles.inputContainer}>
                            <MaterialCommunityIcons
                                name="email-outline"
                                size={20}
                                color={theme.colors.textSecondary}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Email *"
                                placeholderTextColor={theme.colors.textLight}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>

                        {/* Phone Input */}
                        <View style={styles.inputContainer}>
                            <MaterialCommunityIcons
                                name="phone-outline"
                                size={20}
                                color={theme.colors.textSecondary}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Phone (Optional)"
                                placeholderTextColor={theme.colors.textLight}
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                            />
                        </View>

                        {/* Password Input */}
                        <View style={styles.inputContainer}>
                            <MaterialCommunityIcons
                                name="lock-outline"
                                size={20}
                                color={theme.colors.textSecondary}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Password *"
                                placeholderTextColor={theme.colors.textLight}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.eyeIcon}
                            >
                                <MaterialCommunityIcons
                                    name={showPassword ? 'eye-off' : 'eye'}
                                    size={20}
                                    color={theme.colors.textSecondary}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Confirm Password Input */}
                        <View style={styles.inputContainer}>
                            <MaterialCommunityIcons
                                name="lock-check-outline"
                                size={20}
                                color={theme.colors.textSecondary}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm Password *"
                                placeholderTextColor={theme.colors.textLight}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                            />
                        </View>

                        {/* Password hint */}
                        <Text style={styles.hint}>Password must be at least 6 characters</Text>

                        {/* Signup Button */}
                        <TouchableOpacity
                            style={[styles.signupButton, isLoading && styles.signupButtonDisabled]}
                            onPress={handleSignup}
                            disabled={isLoading}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={[theme.colors.primary, theme.colors.primaryDark]}
                                style={styles.signupButtonGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                {isLoading ? (
                                    <ActivityIndicator color={theme.colors.secondary} />
                                ) : (
                                    <>
                                        <Text style={styles.signupButtonText}>Create Account</Text>
                                        <MaterialCommunityIcons
                                            name="arrow-right"
                                            size={20}
                                            color={theme.colors.secondary}
                                        />
                                    </>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Login Link */}
                        <View style={styles.loginContainer}>
                            <Text style={styles.loginText}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.loginLink}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    safeArea: {
        backgroundColor: theme.colors.background,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: theme.borderRadius.md,
        backgroundColor: theme.colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: theme.spacing.base,
        marginTop: theme.spacing.sm,
        ...theme.shadows.sm,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: theme.spacing.xl,
        paddingTop: theme.spacing.lg,
    },
    title: {
        fontSize: theme.fontSizes['3xl'],
        fontFamily: theme.fonts.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    subtitle: {
        fontSize: theme.fontSizes.base,
        fontFamily: theme.fonts.regular,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.xl,
        lineHeight: 22,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        marginBottom: theme.spacing.base,
        paddingHorizontal: theme.spacing.base,
        ...theme.shadows.sm,
    },
    inputIcon: {
        marginRight: theme.spacing.md,
    },
    input: {
        flex: 1,
        height: 56,
        fontSize: theme.fontSizes.base,
        fontFamily: theme.fonts.regular,
        color: theme.colors.text,
    },
    eyeIcon: {
        padding: theme.spacing.sm,
    },
    hint: {
        fontSize: theme.fontSizes.sm,
        fontFamily: theme.fonts.regular,
        color: theme.colors.textLight,
        marginBottom: theme.spacing.xl,
        marginTop: -theme.spacing.sm,
    },
    signupButton: {
        borderRadius: theme.borderRadius.lg,
        overflow: 'hidden',
        marginBottom: theme.spacing.xl,
        ...theme.shadows.md,
    },
    signupButtonDisabled: {
        opacity: 0.6,
    },
    signupButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        gap: theme.spacing.sm,
    },
    signupButtonText: {
        fontSize: theme.fontSizes.lg,
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.secondary,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.xl,
    },
    loginText: {
        fontSize: theme.fontSizes.base,
        fontFamily: theme.fonts.regular,
        color: theme.colors.textSecondary,
    },
    loginLink: {
        fontSize: theme.fontSizes.base,
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.primary,
    },
    roleContainer: {
        marginBottom: theme.spacing.xl,
    },
    roleLabel: {
        fontSize: theme.fontSizes.base,
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },
    roleButtons: {
        flexDirection: 'row',
        gap: theme.spacing.md,
    },
    roleButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing.sm,
        paddingVertical: theme.spacing.base,
        borderRadius: theme.borderRadius.lg,
        backgroundColor: theme.colors.surface,
        borderWidth: 2,
        borderColor: 'transparent',
        ...theme.shadows.sm,
    },
    roleButtonActive: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    roleButtonText: {
        fontSize: theme.fontSizes.base,
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.textSecondary,
    },
    roleButtonTextActive: {
        color: theme.colors.secondary,
    },
});
