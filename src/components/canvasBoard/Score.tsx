import { useSelector } from "react-redux"
import { RootState } from "../../store/rootReducer"
import { useCallback, useEffect } from "react"


function Score() {
    const currScore = useSelector((state: RootState) => state.board.score)
    // const handleSpeed = useCallback(()=>{
    //     if(currScore > 0){
    // },[currScore])
    // useEffect(()=>{
    //     if(currScore>)
    // },[currScore])
    return (
        <div>Score : {currScore}</div>
    )
}

export default Score