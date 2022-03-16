import { createSlice } from '@reduxjs/toolkit'

export interface AppState {
    types: string[];
    selected?: string;
}

const initialState: AppState = {
    types: []
}

export const plantsSlice = createSlice({
    name: 'plants',
    initialState,
    reducers: {
        updateTypes: (state, action) => {
            state.types = action.payload
        },
        updateSelected: (state, action) => {
            state.selected = action.payload
        }
    },
})

export const { updateTypes, updateSelected} = plantsSlice.actions

export default plantsSlice.reducer