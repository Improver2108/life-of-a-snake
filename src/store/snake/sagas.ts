import { delay, put, select, takeEvery } from "redux-saga/effects";
import { START_MOVING, direction } from "./types";
import { makeMove } from "./slice";
import { RootState } from "../rootReducer";


function getMoveData(direction:direction) {
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
            const direction:direction = yield select((state: RootState) => state.snake.movingDirection);
            yield put(makeMove(getMoveData(direction)))
            yield delay(100)
        } else break
    }
    
}

export function* watchSnakeSaga() {
    yield takeEvery(START_MOVING, startMoveSaga);
}