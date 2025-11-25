// src/context/AppContext.js
// Global state management using Context API and useReducer

import React, { createContext, useContext, useReducer } from 'react';
import { appReducer, initialState } from './appReducer';

// Create Context
const AppContext = createContext();

// Provider Component
export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    const value = {
        state,
        dispatch,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom Hook to use the App Context
export const useApp = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }

    return context;
};

export default AppContext;
