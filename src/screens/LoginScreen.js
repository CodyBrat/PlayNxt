// src/screens/LoginScreen.js
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

export default function LoginScreen({ navigation }) {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter email and password');
            return;
        }

        setIsLoading(true);
        const result = await login(email.trim().toLowerCase(), password);
        setIsLoading(false);

        if (!result.success) {
            Alert.alert('Login Failed', result.error);
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[theme.colors.primary, theme.colors.primaryDark]}
                style={styles.topGradient}
            >
                <SafeAreaView edges={['top']}>
                    <View style={styles.header}>
                        <MaterialCommunityIcons
                            name="soccer-field"
                            size={60}
                            color={theme.colors.secondary}
                        />
                        <Text style={styles.logo}>PlayNxt</Text>
                        <Text style={styles.tagline}>Find Your Perfect Turf</Text>
                    </View>
                </SafeAreaView>
            </LinearGradient>

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
                        <Text style={styles.title}>Welcome Back!</Text>
                        <Text style={styles.subtitle}>
                            Login to continue booking your favorite turfs
                        </Text>

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
                                placeholder="Email"
                                placeholderTextColor={theme.colors.textLight}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
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
                                placeholder="Password"
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

                        {/* Forgot Password */}
                        <TouchableOpacity style={styles.forgotPassword}>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        {/* Login Button */}
                        <TouchableOpacity
                            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                            onPress={handleLogin}
                            disabled={isLoading}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={[theme.colors.primary, theme.colors.primaryDark]}
                                style={styles.loginButtonGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                {isLoading ? (
                                    <ActivityIndicator color={theme.colors.secondary} />
                                ) : (
                                    <>
                                        <Text style={styles.loginButtonText}>Login</Text>
                                        <MaterialCommunityIcons
                                            name="arrow-right"
                                            size={20}
                                            color={theme.colors.secondary}
                                        />
                                    </>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Sign Up Link */}
                        <View style={styles.signupContainer}>
                            <Text style={styles.signupText}>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                                <Text style={styles.signupLink}>Sign Up</Text>
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
    topGradient: {
        paddingBottom: theme.spacing['3xl'],
    },
    header: {
        alignItems: 'center',
        paddingTop: theme.spacing.lg,
    },
    logo: {
        fontSize: theme.fontSizes['4xl'],
        fontFamily: theme.fonts.bold,
        color: theme.colors.secondary,
        marginTop: theme.spacing.md,
    },
    tagline: {
        fontSize: theme.fontSizes.base,
        fontFamily: theme.fonts.regular,
        color: theme.colors.secondary,
        opacity: 0.9,
        marginTop: theme.spacing.xs,
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
        paddingTop: theme.spacing.xl,
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
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: theme.spacing.xl,
    },
    forgotPasswordText: {
        fontSize: theme.fontSizes.sm,
        fontFamily: theme.fonts.medium,
        color: theme.colors.primary,
    },
    loginButton: {
        borderRadius: theme.borderRadius.lg,
        overflow: 'hidden',
        marginBottom: theme.spacing.xl,
        ...theme.shadows.md,
    },
    loginButtonDisabled: {
        opacity: 0.6,
    },
    loginButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        gap: theme.spacing.sm,
    },
    loginButtonText: {
        fontSize: theme.fontSizes.lg,
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.secondary,
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: theme.spacing.lg,
    },
    signupText: {
        fontSize: theme.fontSizes.base,
        fontFamily: theme.fonts.regular,
        color: theme.colors.textSecondary,
    },
    signupLink: {
        fontSize: theme.fontSizes.base,
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.primary,
    },
});
