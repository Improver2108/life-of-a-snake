import { createSlice } from "@reduxjs/toolkit";
import BoardStateType from "./types";


const initialScore: BoardStateType = {
    score:0,
}

const boardSlice = createSlice({
    name: "board",
    initialState: initialScore,
    reducers: {
        incrementScore: (state: BoardStateType) => {
            console.log('hey')
            state.score++;
        }
    }
})

const boardReducer = boardSlice.reducer;
export const { incrementScore } = boardSlice.actions;

export default boardReducer;