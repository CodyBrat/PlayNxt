// src/context/AppContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { appReducer, initialState, actionTypes } from './appReducer';
import { venues as mockVenues, userBookings, userData } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Initialize app data
    useEffect(() => {
        // Simulate loading data
        dispatch({ type: actionTypes.SET_USER, payload: userData });
        dispatch({ type: actionTypes.SET_VENUES, payload: mockVenues });
        dispatch({ type: actionTypes.SET_BOOKINGS, payload: userBookings });
    }, []);

    // Helper functions
    const addBooking = (booking) => {
        const newBooking = {
            ...booking,
            id: `b${Date.now()}`,
            bookingDate: new Date().toISOString().split('T')[0],
            status: 'confirmed',
        };
        dispatch({ type: actionTypes.ADD_BOOKING, payload: newBooking });
        return newBooking;
    };

    const cancelBooking = (bookingId) => {
        dispatch({ type: actionTypes.CANCEL_BOOKING, payload: bookingId });
    };

    const toggleFavorite = (venueId) => {
        dispatch({ type: actionTypes.TOGGLE_FAVORITE, payload: venueId });
    };

    const setSelectedSport = (sport) => {
        dispatch({ type: actionTypes.SET_SELECTED_SPORT, payload: sport });
    };

    const setSearchQuery = (query) => {
        dispatch({ type: actionTypes.SET_SEARCH_QUERY, payload: query });
    };

    const setFilters = (filters) => {
        dispatch({ type: actionTypes.SET_FILTERS, payload: filters });
    };

    const resetFilters = () => {
        dispatch({ type: actionTypes.RESET_FILTERS });
    };

    // Computed values
    const getFilteredVenues = () => {
        let filtered = state.venues;

        // Filter by sport
        if (state.selectedSport) {
            filtered = filtered.filter(venue => venue.sport === state.selectedSport);
        }

        // Filter by search query
        if (state.searchQuery) {
            const query = state.searchQuery.toLowerCase();
            filtered = filtered.filter(
                venue =>
                    venue.name.toLowerCase().includes(query) ||
                    venue.location.toLowerCase().includes(query) ||
                    venue.sport.toLowerCase().includes(query)
            );
        }

        // Filter by price range
        filtered = filtered.filter(
            venue =>
                venue.price >= state.filters.minPrice &&
                venue.price <= state.filters.maxPrice
        );

        // Filter by rating
        if (state.filters.rating > 0) {
            filtered = filtered.filter(venue => venue.rating >= state.filters.rating);
        }

        return filtered;
    };

    const isFavorite = (venueId) => {
        return state.favorites.includes(venueId);
    };

    const getActiveBookings = () => {
        return state.bookings.filter(booking => {
            const bookingDate = new Date(booking.date);
            const today = new Date();
            return booking.status === 'confirmed' && bookingDate >= today;
        });
    };

    const getPastBookings = () => {
        return state.bookings.filter(booking => {
            const bookingDate = new Date(booking.date);
            const today = new Date();
            return booking.status === 'confirmed' && bookingDate < today;
        });
    };

    const value = {
        state,
        dispatch,
        addBooking,
        cancelBooking,
        toggleFavorite,
        setSelectedSport,
        setSearchQuery,
        setFilters,
        resetFilters,
        getFilteredVenues,
        isFavorite,
        getActiveBookings,
        getPastBookings,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};

export default AppContext;
