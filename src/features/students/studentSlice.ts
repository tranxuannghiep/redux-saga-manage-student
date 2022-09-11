
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, PaginationParams, Student, ListResponse } from 'models';

export interface StudentState {
    loading: boolean;
    list: Student[];
    filter: ListParams;
    pagination: PaginationParams;
}

const initialState: StudentState = {
    loading: false,
    list: [],
    filter: {
        _page: 1,
        _limit: 15,
    },
    pagination: {
        _page: 1,
        _limit: 15,
        _totalRows: 15
    }
}

const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        fetchStudentList(state, action: PayloadAction<ListParams>) {
            state.loading = true
        },
        fetchStudentListSuccess(state, action: PayloadAction<ListResponse<Student>>) {
            state.list = action.payload.data
            state.pagination = action.payload.pagination
            state.loading = false
        },
        fetchStudentListFailed(state) {
            state.loading = false
        },

        setFilter(state, action: PayloadAction<ListParams>) {
            state.filter = action.payload
        },

        setFilterWithDebounce(state, action: PayloadAction<ListParams>) { },
    }
})


export const studentActions = studentSlice.actions

export const selectLoading = (state: RootState) => state.student.loading
export const selectStudentList = (state: RootState) => state.student.list
export const selectPagination = (state: RootState) => state.student.pagination
export const selectFilter = (state: RootState) => state.student.filter

const studentReducer = studentSlice.reducer
export default studentReducer