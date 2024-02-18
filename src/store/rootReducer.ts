import boardReducer from "./board/slice";
import BoardStateType from "./board/types";
import snakeReducer from "./snake/slice";
import SnakeStateType from "./snake/types";

export interface RootState{
    snake:SnakeStateType,
    board:BoardStateType
};

const rootReducer = {
    snake:snakeReducer,
    board:boardReducer

}

export default rootReducer;