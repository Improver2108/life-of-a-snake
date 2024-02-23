export interface IObjectBody {
    x: number;
    y: number;
}

export type Obstacles = IObjectBody[]

export type OccupiedPosition = Map<string, number>;
let gameState: OccupiedPosition = new Map<string, number>([]);

export const clearBoard = (context: any) => {
    context?.clearRect(0, 0, 1000, 600);
}

const drawObject = (
    context: CanvasRenderingContext2D | null,
    objectBody: IObjectBody[],
    fillColor: string,
    gameState: OccupiedPosition,
    type: 1 | 2 | 3,
    strokeStyle = '#146356'
) => {
    if (context) {
        objectBody.forEach((obj: IObjectBody) => {
            context.fillStyle = fillColor;
            context.strokeStyle = strokeStyle;
            context?.fillRect(obj.x, obj.y, 20, 20);
            context?.strokeRect(obj.x, obj.y, 20, 20);
            gameState.set(`${obj.x},${obj.y}`, type); // mark as occupied
        })
    }
}

export const fillBoard = (context: any, snakePos: IObjectBody[], foodPos: IObjectBody[], obstacles: IObjectBody[]) => {
    const newGameState: OccupiedPosition = new Map([]);
    drawObject(context, snakePos, "#91C483", newGameState, 1);
    drawObject(context, foodPos, "#676FA3", newGameState, 2);
    drawObject(context, obstacles, "#000000", newGameState, 3);
    gameState = newGameState;
};

export const collideWithItself = (currPos: IObjectBody, snakePos: IObjectBody[]) => {
    for (let i = 1; i < snakePos.length; i++) {
        if (currPos.x === snakePos[i].x && currPos.y === snakePos[i].y) return true
    }
    return false;
}

export const generateRandomPosition = (maxWidth: number, maxHeight: number): IObjectBody => {
    let width,height;
    do {
        width = Math.random() * (maxWidth);
        height = Math.random() * maxHeight;
    }while(gameState.get(`${width},${height}`))
    
    return { x: width - width % 20, y: height - height % 20 };
}

// export const generateObstacles = (difficulty:number,canvasHeight:number,canvasWeight:number)=>{
//     const newObstacles:Obstacles = [];
//     for(let i=0;i<difficulty;i++)
//         newObstacles.push(generateRandomPosition(gamestcanvasHeight,canvasWeight))
//     return newObstacles;
// }


