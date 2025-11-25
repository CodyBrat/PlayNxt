// src/theme/theme.js
export const theme = {
    colors: {
        primary: '#B8FF3C',        // Lime green - main accent
        primaryDark: '#9FE020',    // Darker lime for pressed states
        primaryLight: '#D4FF8A',   // Lighter lime for backgrounds

        secondary: '#1A1D29',      // Dark navy - sport cards
        secondaryLight: '#2A2F3E', // Lighter navy

        background: '#F8F9FA',     // Light gray background
        surface: '#FFFFFF',        // White cards/surfaces

        text: '#1A1D29',           // Dark text
        textSecondary: '#6B7280',  // Gray text
        textLight: '#9CA3AF',      // Light gray text

        error: '#EF4444',          // Red for errors
        success: '#10B981',        // Green for success
        warning: '#F59E0B',        // Orange for warnings

        border: '#E5E7EB',         // Light borders
        divider: '#F3F4F6',        // Subtle dividers

        // Slot status colors
        slotAvailable: '#B8FF3C',
        slotBooked: '#EF4444',
        slotSelected: '#B8FF3C',
    },

    fonts: {
        regular: 'Inter_400Regular',
        medium: 'Inter_500Medium',
        semiBold: 'Inter_600SemiBold',
        bold: 'Inter_700Bold',

        headingRegular: 'Poppins_400Regular',
        headingSemiBold: 'Poppins_600SemiBold',
        headingBold: 'Poppins_700Bold',
    },

    fontSizes: {
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 20,
        '2xl': 24,
        '3xl': 30,
        '4xl': 36,
    },

    spacing: {
        xs: 4,
        sm: 8,
        md: 12,
        base: 16,
        lg: 20,
        xl: 24,
        '2xl': 32,
        '3xl': 40,
        '4xl': 48,
    },

    borderRadius: {
        sm: 8,
        md: 12,
        lg: 16,
        xl: 20,
        '2xl': 24,
        full: 9999,
    },

    shadows: {
        sm: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
        },
        md: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
            elevation: 3,
        },
        lg: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5,
        },
    },
};

export default theme;
