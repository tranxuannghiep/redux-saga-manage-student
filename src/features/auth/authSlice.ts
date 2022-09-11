
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "models/user";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    email: string;
    name: string;
    password: string;
    repeatPassword: string;
    gender: "male" | "female";
    avatar?: string;
    description?: string;
    region: number | string;
    state: number | string;
}

export interface AuthState {
    isLoggedIn: boolean;
    logging?: boolean;
    currentUser?: User;
    registerLoading: boolean;
}

const initialState: AuthState = {
    isLoggedIn: false,
    logging: false,
    currentUser: undefined,
    registerLoading: false

}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginPayload>) {
            state.logging = true
        },
        loginSuccess(state, action: PayloadAction<User>) {
            state.currentUser = action.payload
            state.isLoggedIn = true
            state.logging = false
        },
        loginFailed(state, action: PayloadAction<string>) {
            state.logging = false
        },

        logout(state) {
            state.isLoggedIn = false
            state.currentUser = undefined
        },

        register(state, action: PayloadAction<RegisterPayload>) {
            state.registerLoading = true
        },
        registerSuccess(state) {
            state.registerLoading = false
        },
        registerFailed(state) {
            state.registerLoading = false
        }
    }
})

// Actions
export const authActions = authSlice.actions

// Selectors
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn
export const selectLogging = (state: any) => state.auth.logging
export const selectLoadingRegister = (state: any) => state.auth.registerLoading
const authReducer = authSlice.reducer
export default authReducer