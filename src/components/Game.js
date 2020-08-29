import React, { useState } from 'react';
import styled from 'styled-components'
import Crystal from './Crystal'
import { COLOR } from '../constants';


const Container = styled.div `
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 1px 1px;
    grid-template-areas: ". . ." ". . ." ". . ."
`;

const DEFAULT_GRID = [
    [COLOR.BLUE, COLOR.BLUE, COLOR.BLUE],
    [COLOR.RED, COLOR.RED, COLOR.BLUREDE],
    [COLOR.YELLOW, COLOR.YELLOW, COLOR.YELLOW],
]

function Game() {
    const [grid, setGrid] = useState([...DEFAULT_GRID])

    const handleCrystalChange = (x, y) => (newColor) => {
        const newGrid = [...grid]
        newGrid[x][y] = newColor
        setGrid(newGrid)
    }

    return (
        <Container>
            {grid.map((rows, x) => rows.map((color, y) => {
                return <Crystal key={`x:${x}-y:${y}`}onChange={handleCrystalChange(x, y)} color={color} x={x} y={y} />
            }))}
        </Container>
    );
}

export default Game;