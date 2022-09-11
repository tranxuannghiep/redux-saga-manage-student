import cityApi from "api/cityApi";
import { call, put, takeLatest } from "redux-saga/effects";
import { cityActions } from "./citySlice";
import { ListResponse, City } from 'models';

function* fetchCityList() {
    try {
        const response: ListResponse<City> = yield call(cityApi.getAll)
        yield put(cityActions.fetchCityListSuccess(response))
    } catch (error) {
        console.log('Failed to fetch city', error)
        yield put(cityActions.fetchCityListFailed())
    }
}

export default function* citySaga() {
    yield takeLatest(cityActions.fetchCityList.type, fetchCityList)
}