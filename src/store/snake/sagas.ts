import { call, delay, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import { START_MOVING, direction } from "./types";
import { increaseSize, makeMove } from "./slice";
import { RootState } from "../rootReducer";
import { incrementBoardScore } from "../board/slice";


function getMoveData(direction: direction) {
    switch (direction) {
        case 'right':
            return ['right', 'left', 20, 0];
        case 'left':
            return ['left', 'right', -20, 0];
        case 'up':
            return ['up', 'down', 0, -20];
        case 'down':
            return ['down', 'up', 0, 20];
        default:
            return ['', '', 20, 0];
    }
}

function* startMoveSaga() {
    while (true) {
        const isMoving: boolean = yield select((state: RootState) => state.snake.movingDirection !== '');
        if (isMoving) {
            const direction: direction = yield select((state: RootState) => state.snake.movingDirection);
            yield put(makeMove(getMoveData(direction)))
            yield delay(100)
        } else break
    }

}

// function* increaseSizeAndIncrementScore() {
//     // dispatch the increaseSize action with the action payload
//     yield call(incrementBoardScore) // dispatch the incrementScore action from the board slice
// }

export function* watchSnakeSaga() {
    yield takeEvery(START_MOVING, startMoveSaga);
    // yield takeLatest(increaseSize.type,increaseSizeAndIncrementScore)
}