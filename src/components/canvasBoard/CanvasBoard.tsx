import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IObjectBody, clearBoard, collideWithItself, drawObject, generateRandomPosition } from "./Utilities/utilities";
import { RootState } from "../../store/rootReducer";
import { AppDispatch } from "../../store/store";
import { changeDirection, increaseSize, startMovingSnake, stopMovingSnake } from "../../store/snake/slice";

interface ICanvasBoard {
    height: number;
    width: number;
}

const CanvasBoard = ({ height, width }: ICanvasBoard) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [foodPos,setFoodPos]=useState<IObjectBody>(generateRandomPosition(width-20,height-20));
    const [isConsumed,setIsConsumed] = useState<boolean>(false);

    const snake1 = useSelector((state: RootState) => state.snake.pos);
    const movingDirection = useSelector((state: RootState) => state.snake.movingDirection)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        window.addEventListener('keypress', handleKeyPress);
        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        };
    })

    
    useEffect(() => {
        setContext(canvasRef.current?.getContext('2d') || null);
        clearBoard(context);
        drawObject(context, snake1, "#91C483");
        drawObject(context,[foodPos],"#676FA3");
        console.log(isConsumed)
        if(snake1[0].x===foodPos.x && snake1[0].y===foodPos.y) {
            setIsConsumed(true);
        };

        if (snake1[0].x >= width || snake1[0].x <= -20 || snake1[0].y >= height || snake1[0].y <= -20 || collideWithItself(snake1[0], snake1)) {
            // console.log(snake1[0].x, snake1[0].y)
            setIsGameOver(!isGameOver)
            dispatch(stopMovingSnake());
            // clearBoard(context)
            // drawObject(context, snake1, "#91C483");
            window.removeEventListener('keypress', handleKeyPress)
        }

    }, [context, snake1])

    useEffect(()=>{
        if(isConsumed){
            
            const pos=generateRandomPosition(width - 20 , height - 20);
            setFoodPos(pos)
            setIsConsumed(false)
            dispatch(increaseSize());
        }   
    },[isConsumed,foodPos])

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
            {/* <button onClick={() => dispatch(increaseSize())}>Go Down</button> */}
        </>

    );
};

export default CanvasBoard;