import { PayloadAction } from "@reduxjs/toolkit"
import {put, takeEvery} from "redux-saga/effects"
import { incrementSaga, incrementSagaSuccess } from "./counterSlice"

function* handleIncrementSaga(action:PayloadAction<number>){
    yield put(incrementSagaSuccess(action.payload)) 
}

export default function* counterSaga(){
    yield takeEvery(incrementSaga.toString(),handleIncrementSaga)
}