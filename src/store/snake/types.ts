export interface ISnakeCoord {
    x: number;
    y: number;
}
export type direction= 'up' | 'down' | 'left' | 'right';
export default interface SnakeStateType {
    pos: ISnakeCoord[],
    movingDirection: direction|'';
    currentSpeedMultiplier :number
    
}

export const SNAKE = "snake";
export type SNAKE = typeof SNAKE;
export const START_MOVING = `${SNAKE}/startMovingSnake`;
export type START_MOVING = typeof START_MOVING;
