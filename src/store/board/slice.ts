import { createSlice } from "@reduxjs/toolkit";
import BoardStateType from "./types";


const initialScore: BoardStateType = {
    score: 0,
}

const boardSlice = createSlice({
    name: "board",
    initialState: initialScore,
    reducers: {
        incrementScore: (state: BoardStateType) => {
            console.log('hey')
            state.score++;
        },
        resetScore: (state: BoardStateType) => {
            state.score = 0;
        }
    }
})

const boardReducer = boardSlice.reducer;
export const { incrementScore, resetScore } = boardSlice.actions;

export default boardReducer;