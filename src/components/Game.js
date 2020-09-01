import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import Crystal from './Crystal'
import { COLOR } from '../constants';
import { resolve } from '../utils/crystalResolver'


const Container = styled.div `
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 1px 1px;
    grid-template-areas: ". . ." ". . ." ". . ."
`;

const Actions = styled.div``;

const DEFAULT_GRID = [
    [COLOR.BLUE, COLOR.BLUE, COLOR.BLUE],
    [COLOR.RED, COLOR.RED, COLOR.RED],
    [COLOR.YELLOW, COLOR.YELLOW, COLOR.YELLOW],
]

function Game() {
    const [grid, setGrid] = useState([...DEFAULT_GRID])
    const [resolving, setResolving] = useState(false)
    const [result, setResult] = useState({ state: 'IDLE', steps: [], tries: 0 })
    // const memoizedCallback = useCallback(
    //     () => {
    //         doSomething(a, b);
    //     },
    //     [resolving],
    // );
    // const [countTries, setCurrentCountTries] = useState(0)
    useEffect(() => {
        console.log('effecting', resolving);
        if (resolving) {
            const { grid: _grid, ...resolveResult } = resolve(grid)
            if (resolveResult.state === 'WIN') {
                setGrid(_grid)
            }
            setResult({ ...resolveResult })
            console.log({ resolveResult }, _grid);
            setResolving(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resolving])

    const handleCrystalChange = (x, y) => (newColor) => {
        const newGrid = [...grid]
        newGrid[x][y] = newColor
        setGrid(newGrid)
    }

    const toggleResolver = () => {
        setResolving(!resolving)
    }

    return (
        <Container>
            {grid.map((rows, x) => rows.map((color, y) => {
                return <Crystal key={`x:${x}-y:${y}`}onChange={handleCrystalChange(x, y)} color={color} x={x} y={y} />
            }))}
            <Actions>
                {JSON.stringify(result)}
                <button onClick={toggleResolver}>{resolving ? 'Stop' : 'Start' }</button>
            </Actions>
        </Container>
    );
}

export default Game;