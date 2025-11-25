// src/theme/theme.js
// Modern SaaS-style theme configuration for PlayNxt

export const colors = {
  // Primary Colors
  primary: '#007AFF',        // Vibrant Blue
  primaryLight: '#5AC8FA',   // Light Blue
  primaryDark: '#0051D5',    // Dark Blue
  
  // Accent Colors
  accent: '#FF6B35',         // Orange
  accentLight: '#FF8C61',    // Light Orange
  
  // Semantic Colors
  success: '#34C759',        // Green
  warning: '#FF9500',        // Yellow
  error: '#FF3B30',          // Red
  info: '#5AC8FA',           // Light Blue
  
  // Grays
  gray100: '#F7F7F7',
  gray200: '#E8E8E8',
  gray300: '#D1D1D6',
  gray400: '#8E8E93',
  gray500: '#636366',
  gray600: '#48484A',
  gray700: '#3A3A3C',
  gray800: '#2C2C2E',
  gray900: '#1C1C1E',
  
  // Background
  background: '#FFFFFF',
  backgroundSecondary: '#F7F7F7',
  
  // Text
  text: '#1C1C1E',
  textSecondary: '#8E8E93',
  textTertiary: '#C7C7CC',
  
  // Card & Surface
  card: '#FFFFFF',
  surface: '#F7F7F7',
  
  // Border
  border: '#E8E8E8',
  
  // Other
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

export const typography = {
  // Font Families
  fontFamily: {
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    semiBold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',
    heading: 'Poppins_600SemiBold',
    headingBold: 'Poppins_700Bold',
  },
  
  // Font Sizes
  fontSize: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
  },
  
  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },
  
  // Letter Spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
};

export const borderRadius = {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
};

export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  base: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  md: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  lg: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  xl: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 15,
  },
};

export const components = {
  // Button styles
  button: {
    primary: {
      backgroundColor: colors.primary,
      borderRadius: borderRadius.md,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      ...shadows.sm,
    },
    secondary: {
      backgroundColor: colors.white,
      borderRadius: borderRadius.md,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      borderWidth: 1,
      borderColor: colors.border,
    },
  },
  
  // Card styles
  card: {
    default: {
      backgroundColor: colors.card,
      borderRadius: borderRadius.lg,
      padding: spacing.base,
      ...shadows.base,
    },
    elevated: {
      backgroundColor: colors.card,
      borderRadius: borderRadius.lg,
      padding: spacing.base,
      ...shadows.md,
    },
  },
  
  // Input styles
  input: {
    default: {
      backgroundColor: colors.white,
      borderRadius: borderRadius.md,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.base,
      borderWidth: 1,
      borderColor: colors.border,
      fontSize: typography.fontSize.base,
      fontFamily: typography.fontFamily.regular,
    },
  },
  
  // Chip styles
  chip: {
    default: {
      borderRadius: borderRadius.full,
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
      backgroundColor: colors.gray100,
    },
    active: {
      borderRadius: borderRadius.full,
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
      backgroundColor: colors.primary,
    },
  },
};

// Predefined combinations for common UI patterns
export const presets = {
  header: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
    ...shadows.sm,
  },
  
  searchBar: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.base,
    ...shadows.sm,
  },
  
  priceTag: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  
  badge: {
    backgroundColor: colors.accent,
    borderRadius: borderRadius.full,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  components,
  presets,
};
