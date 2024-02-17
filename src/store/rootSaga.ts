import { all, fork } from "redux-saga/effects"
import { watchSnakeSaga } from "./snake/sagas";

const rootSaga = function* () {
    yield all([
        fork(watchSnakeSaga)
    ]);
};

export default rootSaga;