// src/context/appReducer.js
// Reducer for managing global app state

export const initialState = {
    user: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://i.pravatar.cc/150?img=12',
        location: {
            city: 'London',
            country: 'England',
        },
    },

    bookings: {
        upcoming: [
            {
                id: 'b1',
                venueId: '1',
                venueName: 'Kennington Oval, London...',
                venueImage: 'https://5.imimg.com/data5/SELLER/Default/2023/10/350327019/NU/WB/TZ/38215148/7-a-side-football-turf.jpg',
                sport: 'Badminton',
                date: '16 August 2023',
                time: '11:00am - 12:30pm',
                price: 145.30,
                status: 'confirmed',
            },
        ],
        past: [],
    },

    favorites: ['1', '2'],

    filters: {
        selectedSport: null,
        searchQuery: '',
        priceRange: [0, 2000],
        sortBy: 'popularity',
    },

    venues: [
        {
            id: '1',
            name: 'Kennington Oval, London, outdoor ground field',
            location: 'Oval London, England',
            rating: 4.95,
            reviews: 22,
            price: 145.30,
            currency: '₹',
            image: 'https://5.imimg.com/data5/SELLER/Default/2023/10/350327019/NU/WB/TZ/38215148/7-a-side-football-turf.jpg',
            sports: ['Badminton', 'Tennis', 'Table Tennis'],
            amenities: ['CCTV Camera', 'Lockers', 'Parking', 'Washroom'],
            availability: 'Aug 16, 11:00am - 12:30pm',
            isOnGroundStaff: true,
        },
        {
            id: '2',
            name: 'Gitai Turf, Porwal Road',
            location: 'Porwal Road, Pune',
            rating: 4.8,
            reviews: 18,
            price: 1200,
            currency: '₹',
            image: 'https://turftown.in/_next/image?url=https%3A%2F%2Fturftown.s3.ap-south-1.amazonaws.com%2Fsuper_admin%2Ftt-1727866029596.webp&w=828&q=75',
            sports: ['Football', 'Cricket', 'Basketball'],
            amenities: ['Parking', 'Washroom', 'Changing Room'],
            availability: 'Aug 17, 2:00pm - 4:00pm',
            isOnGroundStaff: false,
        },
    ],
};

// Action Types
export const ActionTypes = {
    // User actions
    UPDATE_USER: 'UPDATE_USER',
    UPDATE_LOCATION: 'UPDATE_LOCATION',

    // Booking actions
    ADD_BOOKING: 'ADD_BOOKING',
    CANCEL_BOOKING: 'CANCEL_BOOKING',
    COMPLETE_BOOKING: 'COMPLETE_BOOKING',

    // Favorites actions
    TOGGLE_FAVORITE: 'TOGGLE_FAVORITE',

    // Filter actions
    SET_SELECTED_SPORT: 'SET_SELECTED_SPORT',
    SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
    SET_PRICE_RANGE: 'SET_PRICE_RANGE',
    SET_SORT_BY: 'SET_SORT_BY',
    RESET_FILTERS: 'RESET_FILTERS',

    // Venue actions
    ADD_VENUE: 'ADD_VENUE',
    UPDATE_VENUE: 'UPDATE_VENUE',
};

export const appReducer = (state, action) => {
    switch (action.type) {
        // User actions
        case ActionTypes.UPDATE_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload,
                },
            };

        case ActionTypes.UPDATE_LOCATION:
            return {
                ...state,
                user: {
                    ...state.user,
                    location: action.payload,
                },
            };

        // Booking actions
        case ActionTypes.ADD_BOOKING:
            return {
                ...state,
                bookings: {
                    ...state.bookings,
                    upcoming: [...state.bookings.upcoming, action.payload],
                },
            };

        case ActionTypes.CANCEL_BOOKING:
            return {
                ...state,
                bookings: {
                    ...state.bookings,
                    upcoming: state.bookings.upcoming.filter(b => b.id !== action.payload),
                },
            };

        case ActionTypes.COMPLETE_BOOKING:
            const completedBooking = state.bookings.upcoming.find(b => b.id === action.payload);
            return {
                ...state,
                bookings: {
                    upcoming: state.bookings.upcoming.filter(b => b.id !== action.payload),
                    past: [...state.bookings.past, { ...completedBooking, status: 'completed' }],
                },
            };

        // Favorites actions
        case ActionTypes.TOGGLE_FAVORITE:
            const venueId = action.payload;
            const isFavorite = state.favorites.includes(venueId);

            return {
                ...state,
                favorites: isFavorite
                    ? state.favorites.filter(id => id !== venueId)
                    : [...state.favorites, venueId],
            };

        // Filter actions
        case ActionTypes.SET_SELECTED_SPORT:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    selectedSport: action.payload,
                },
            };

        case ActionTypes.SET_SEARCH_QUERY:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    searchQuery: action.payload,
                },
            };

        case ActionTypes.SET_PRICE_RANGE:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    priceRange: action.payload,
                },
            };

        case ActionTypes.SET_SORT_BY:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    sortBy: action.payload,
                },
            };

        case ActionTypes.RESET_FILTERS:
            return {
                ...state,
                filters: {
                    selectedSport: null,
                    searchQuery: '',
                    priceRange: [0, 2000],
                    sortBy: 'popularity',
                },
            };

        // Venue actions
        case ActionTypes.ADD_VENUE:
            return {
                ...state,
                venues: [...state.venues, action.payload],
            };

        case ActionTypes.UPDATE_VENUE:
            return {
                ...state,
                venues: state.venues.map(venue =>
                    venue.id === action.payload.id ? { ...venue, ...action.payload.data } : venue
                ),
            };

        default:
            return state;
    }
};
