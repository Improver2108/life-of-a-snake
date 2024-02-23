import { useSelector } from "react-redux"
import { RootState } from "../../store/rootReducer"
import { Heading } from "@chakra-ui/react"


function Score() {
    const currScore = useSelector((state: RootState) => state.board.score)
    
    return (
        <Heading as='h1' size='xl'>Score : {currScore}</Heading>
    )
}

export default Score