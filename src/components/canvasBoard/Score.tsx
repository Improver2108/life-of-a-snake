import { useSelector } from "react-redux"
import { RootState } from "../../store/rootReducer"


function Score() {
    const currScore = useSelector((state: RootState) => state.board.score)
    
    return (
        <div>Score : {currScore}</div>
    )
}

export default Score