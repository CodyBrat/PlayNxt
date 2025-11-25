// src/context/appReducer.js

export const initialState = {
    user: null,
    bookings: [],
    venues: [],
    favorites: [],
    selectedSport: null,
    searchQuery: '',
    filters: {
        minPrice: 0,
        maxPrice: 10000,
        rating: 0,
    },
};

export const actionTypes = {
    SET_USER: 'SET_USER',
    SET_VENUES: 'SET_VENUES',
    SET_BOOKINGS: 'SET_BOOKINGS',
    ADD_BOOKING: 'ADD_BOOKING',
    CANCEL_BOOKING: 'CANCEL_BOOKING',
    TOGGLE_FAVORITE: 'TOGGLE_FAVORITE',
    SET_SELECTED_SPORT: 'SET_SELECTED_SPORT',
    SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
    SET_FILTERS: 'SET_FILTERS',
    RESET_FILTERS: 'RESET_FILTERS',
};

export const appReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.payload,
                favorites: action.payload?.favorites || [],
            };

        case actionTypes.SET_VENUES:
            return {
                ...state,
                venues: action.payload,
            };

        case actionTypes.SET_BOOKINGS:
            return {
                ...state,
                bookings: action.payload,
            };

        case actionTypes.ADD_BOOKING:
            return {
                ...state,
                bookings: [...state.bookings, action.payload],
            };

        case actionTypes.CANCEL_BOOKING:
            return {
                ...state,
                bookings: state.bookings.map(booking =>
                    booking.id === action.payload
                        ? { ...booking, status: 'cancelled' }
                        : booking
                ),
            };

        case actionTypes.TOGGLE_FAVORITE:
            const venueId = action.payload;
            const isFavorite = state.favorites.includes(venueId);

            return {
                ...state,
                favorites: isFavorite
                    ? state.favorites.filter(id => id !== venueId)
                    : [...state.favorites, venueId],
            };

        case actionTypes.SET_SELECTED_SPORT:
            return {
                ...state,
                selectedSport: action.payload,
            };

        case actionTypes.SET_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: action.payload,
            };

        case actionTypes.SET_FILTERS:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    ...action.payload,
                },
            };

        case actionTypes.RESET_FILTERS:
            return {
                ...state,
                filters: initialState.filters,
                selectedSport: null,
                searchQuery: '',
            };

        default:
            return state;
    }
};
