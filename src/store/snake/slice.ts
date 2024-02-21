import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import SnakeStateType from "./types"

const snakeInitialState: SnakeStateType = {
    pos: [
        { x: 580, y: 300 },
        { x: 560, y: 300 },
        { x: 540, y: 300 },
        { x: 520, y: 300 },
    ],
    movingDirection: '',
    currentSpeedMultiplier: 1
};


const snakeSlice = createSlice({
    name: 'snake',
    initialState: snakeInitialState,
    reducers: {
        startMovingSnake: (state: SnakeStateType) => {
            state.movingDirection = 'right';
        },
        stopMovingSnake: (state: SnakeStateType) => {
            state.pos = snakeInitialState.pos
            state.movingDirection = snakeInitialState.movingDirection;
        },
        makeMove: (state: SnakeStateType, { payload: data }) => {
            const newX = state.pos[0].x + data[2];
            const newY = state.pos[0].y + data[3];
            state.pos.unshift({ x: newX, y: newY });
            state.pos.pop();
        },
        changeDirection: (state: SnakeStateType, { payload: data }) => {
            if (state.movingDirection !== data[1])
                state.movingDirection = data[0];
        },
        increaseSize: (state: SnakeStateType) => {
            const len = state.pos.length
            const newX = state.pos[len - 1].x - 20;
            const newY = state.pos[len - 1].y - 20;
            state.pos.push({ x: newX, y: newY });
        },
        changeSpeed: (state: SnakeStateType,{payload:speed}:PayloadAction<number>) => {
            state.currentSpeedMultiplier = speed;
        }
    }
});
const snakeReducer = snakeSlice.reducer;
export const { startMovingSnake, makeMove, changeDirection, stopMovingSnake, increaseSize, changeSpeed } = snakeSlice.actions;
export default snakeReducer