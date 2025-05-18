import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const initialState = {
    token: localStorage.getItem('token') || null,
    isAuthenticated: false,
    usuario: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload.token);
            const decodedToken = jwtDecode(action.payload.token);
            state.usuario = decodedToken;
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.usuario = null;
            localStorage.removeItem('token');
        },
    },
});