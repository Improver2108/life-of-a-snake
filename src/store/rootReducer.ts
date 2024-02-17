import snakeReducer from "./snake/slice";
import SnakeStateType from "./snake/types";

export interface RootState{
    snake:SnakeStateType
};

const rootReducer = {
    snake:snakeReducer
}

export default rootReducer;