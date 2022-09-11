
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { City, ListResponse } from 'models';

export interface CityState {
    loading: boolean;
    list: City[]
}

const initialState: CityState = {
    loading: false,
    list: []
}

const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        fetchCityList(state) {
            state.loading = true
        },
        fetchCityListSuccess(state, action: PayloadAction<ListResponse<City>>) {
            state.loading = false
            state.list = action.payload.data
        },
        fetchCityListFailed(state) {
            state.loading = false
        },
    }
})


export const cityActions = citySlice.actions

export const selectCityList = (state: RootState) => state.city.list
export const selectCityMap = createSelector(selectCityList, (cityList) =>
    cityList.reduce((map: { [key: string]: City }, city) => {
        map[city.code] = city
        return map
    }, {})
)

export const selectCityOptions = createSelector(selectCityList, (cityList) => {

    const cityOptions = cityList.map(city => (
        {
            label: city.name,
            value: city.code
        }
    ))
    cityOptions.unshift({ label: 'Select options', value: '' })

    return cityOptions
})

const cityReducer = citySlice.reducer
export default cityReducer