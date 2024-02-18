import { ChakraProvider, Container, Heading } from "@chakra-ui/react"
import CanvasBoard from "./canvasBoard/CanvasBoard"
import Score from "./canvasBoard/Score";

const Game = () => {
    return (
        <ChakraProvider>
            <Container maxW='container.lg' centerContent>
                <Heading as='h1' size='xl'>SNAKE GAME</Heading>
                <CanvasBoard height={600} width={1000} />
                <Score/>
            </Container>
        </ChakraProvider>
    )
}

export default Game;