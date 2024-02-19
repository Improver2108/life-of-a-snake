import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IObjectBody, clearBoard, collideWithItself, drawObject, generateRandomPosition } from "./Utilities/utilities";
import { RootState } from "../../store/rootReducer";
import { AppDispatch } from "../../store/store";
import { changeDirection, increaseSize, startMovingSnake, stopMovingSnake } from "../../store/snake/slice";
import { incrementBoardScore, resetScore } from "../../store/board/slice";
import Instruction from "./Instruction";

interface ICanvasBoard {
    height: number;
    width: number;
}

const CanvasBoard = ({ height, width }: ICanvasBoard) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [foodPos, setFoodPos] = useState<IObjectBody>(generateRandomPosition(width - 20, height - 20));
    const [isConsumed, setIsConsumed] = useState<boolean>(false)


    const snake1 = useSelector((state: RootState) => state.snake);
    const movingDirection = useSelector((state: RootState) => state.snake.movingDirection)


    const dispatch = useDispatch<AppDispatch>()
    const isDispatchedRef = useRef(false);

    useEffect(() => {
        window.addEventListener('keypress', handleKeyPress);
        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        };
    })


    useEffect(() => {
        setContext(canvasRef.current?.getContext('2d') || null);
        clearBoard(context);
        drawObject(context, snake1.pos, "#91C483");
        drawObject(context, [foodPos], "#676FA3");
        if (snake1.pos[0].x === foodPos.x && snake1.pos[0].y === foodPos.y) {
            console.log('1')
            setIsConsumed(true);
            const foodPos =  generateRandomPosition(width - 20, height - 20);
            setFoodPos(foodPos);
        };

        if (snake1.pos[0].x >= width || snake1.pos[0].x <= -20 || snake1.pos[0].y >= height || snake1.pos[0].y <= -2 || collideWithItself(snake1.pos[0],snake1.pos)) {
            setIsGameOver(!isGameOver)
            dispatch(stopMovingSnake());
            dispatch(resetScore());
        };

    }, [context, snake1.pos])

    useEffect(() => {
        if (isConsumed) {
            setIsConsumed(false)
            dispatch(incrementBoardScore())
            dispatch(increaseSize())
        }
    }, [isConsumed])


    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        event.preventDefault();
        const key = event.key;
        if (movingDirection) {
            if (key === 'd') dispatch(changeDirection(['right', 'left', 20, 0]));
            else if (key === 'a') dispatch(changeDirection(['left', 'right', -20, 0]));
            else if (key === 'w') dispatch(changeDirection(['up', 'down', 0, -20]));
            else if (key === 's') dispatch(changeDirection(['down', 'up', 0, 20]));
        }
        else {
            if (key === 'd') dispatch(startMovingSnake());
        }
    }, [movingDirection]);

    const resetBoard = useCallback(() => {
        dispatch(resetScore());
        dispatch(stopMovingSnake())
        clearBoard(context);
        drawObject(context, snake1.pos, "#91C483");
        drawObject(
            context,
            [generateRandomPosition(width - 20, height - 20)],
            "#676FA3"
        ); //Draws object randomly
        window.addEventListener("keypress", handleKeyPress);
    }, [context, snake1])

    return (
        <>
            <canvas
                ref={canvasRef}
                style={{
                    border: "3px solid black",
                }}
                height={height}
                width={width}
            />
            <Instruction resetBoard={resetBoard} />
        </>

    );
};

export default CanvasBoard;