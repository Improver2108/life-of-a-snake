export interface IObjectBody {
    x: number;
    y: number;
}

export const clearBoard = (context: CanvasRenderingContext2D | null) => {
    context?.clearRect(0, 0, 1000, 600);
}

export const drawObject = (
    context: CanvasRenderingContext2D | null,
    objectBody: IObjectBody[],
    fillColor: string,
    strokeStyle = '#146356'
) => {
    if (context) {
        objectBody.forEach((obj: IObjectBody) => {
            context.fillStyle = fillColor;
            context.strokeStyle = strokeStyle;
            context?.fillRect(obj.x, obj.y, 20, 20);
            context?.strokeRect(obj.x, obj.y, 20, 20);
        })
    }
}

export const collideWithItself = (currPos: IObjectBody, snakePos: IObjectBody[]) => {
    for (let i = 1; i < snakePos.length; i++) {
        if (currPos.x === snakePos[i].x && currPos.y === snakePos[i].y) return true
    }
    return false;
}


export const generateRandomPosition = (maxWidth:number,maxHeight:number):IObjectBody=>{
    const width = Math.random() * (maxWidth);
    const height =  Math.random() * maxHeight;
    return {x : width-width % 20 , y : height - height % 20};
}


