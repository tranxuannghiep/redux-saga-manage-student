import { PayloadAction } from "@reduxjs/toolkit";
import authApi from "api/authApi";
import { push } from "connected-react-router";
import { User } from "models";
import { call, delay, fork, put, take, takeLatest } from "redux-saga/effects";
import { authActions, LoginPayload, RegisterPayload } from "./authSlice";

function* handleLogin(payload: LoginPayload) {
    try {
        const data: User = yield call(authApi.login, payload)
        localStorage.setItem('access_token', data.token)
        yield put(authActions.loginSuccess(data))

        yield put(push("/admin/dashboard"))
    } catch (error: any) {
        yield put(authActions.loginFailed(error.message))
    }

}

function* handleLogout() {
    console.log("handleLogout")
    yield delay(500)
    localStorage.removeItem('access_token')
    yield put(push("/auth/login"))
}

function* registerUser(action: PayloadAction<RegisterPayload>) {
    try {
        yield call(authApi.register, action.payload)
        yield put(authActions.registerSuccess())
        yield put(push("/auth/login"))
    } catch (error) {
        yield put(authActions.registerFailed())
    }
}

function* watchLoginFlow() {
    while (true) {

        const isLoggedIn = Boolean(localStorage.getItem('access_token'))
        if (!isLoggedIn) {
            const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
            yield fork(handleLogin, action.payload)
        }

        yield take(authActions.logout.type)
        yield call(handleLogout)
    }
}

export function* authSaga() {
    yield fork(watchLoginFlow)
    yield takeLatest(authActions.register, registerUser)
}