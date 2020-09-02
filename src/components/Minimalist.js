import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import Crystal from './Crystal'
import { COLOR, STEP } from '../constants';
import { resolve, isValid as isCrystalValid, isSolved as isCrystalSolved } from '../utils/crystalResolver'
import Steps from './Steps'


const CrystalContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    gap: 6px 6px;
    grid-template-areas: 
        ". . . . ."
        ". . . . ."
        ". . . . ."
        ". . . . ."
        ". . . . .";
`

const Actions = styled.div``;

const CrystalButton = ({ indexes }) => {
    const cls = indexes && indexes.length ? 'font-mono subpixel-antialiased font-semibold shadow-lg flex justify-center bg-gray-300 flex-row items-center text-lg text-gray-800' : ''
    return (<div className={cls}>{(indexes || []).map(index => <div key={index} className="flex-grow">{index}</div>)}</div>)
}

const DEFAULT_GRID = [
    [COLOR.BLUE, COLOR.RED, COLOR.BLUE],
    [COLOR.RED, COLOR.BLUE, COLOR.RED],
    [COLOR.YELLOW, COLOR.YELLOW, COLOR.YELLOW],
]

function Game({ className }) {
    const [grid, setGrid] = useState([...DEFAULT_GRID])
    const [resolving, setResolving] = useState(false)
    const [result, setResult] = useState({ state: 'IDLE', steps: [], tries: 0 })
    const [isValid, setIsValid] = useState(false)
    const [isSolved, setIsSolved] = useState(false)
    useEffect(() => {
        setIsValid(isCrystalValid(grid))
    }, [grid])
    useEffect(() => {
        setIsSolved(isCrystalSolved(grid))
    }, [grid, isValid])
    // const memoizedCallback = useCallback(
    //     () => {
    //         doSomething(a, b);
    //     },
    //     [resolving],
    // );
    // const [countTries, setCurrentCountTries] = useState(0)
    useEffect(() => {
        if (resolving) {
            const { grid: _grid, ...resolveResult } = resolve(grid)
            if (resolveResult.state === 'WIN') {
                setGrid(_grid)
            }
            setResult({ ...resolveResult })
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
        <div className={`${className} overflow-hidden`}>
            <CrystalContainer className="w-full">
            <div></div><CrystalButton indexes={result?.steps?.[STEP.TOP_ONE]} /><CrystalButton indexes={result?.steps?.[STEP.TOP_TWO]} /><CrystalButton indexes={result?.steps?.[STEP.TOP_THREE]} /><div></div>
            <CrystalButton indexes={result?.steps?.[STEP.LEFT_ONE]} />
                    <Crystal className="flex justify-center items-center" key={`x:0-y:0`} onChange={handleCrystalChange(0, 0)} color={grid[0][0]} />
                    <Crystal className="flex justify-center items-center" key={`x:0-y:1`} onChange={handleCrystalChange(0, 1)} color={grid[0][1]} />
                    <Crystal className="flex justify-center items-center" key={`x:0-y:2`} onChange={handleCrystalChange(0, 2)} color={grid[0][2]} />
            <CrystalButton indexes={result?.steps?.[STEP.RIGHT_ONE]} />
            <CrystalButton indexes={result?.steps?.[STEP.LEFT_TWO]} />
                    <Crystal className="flex justify-center items-center" key={`x:1-y:0`} onChange={handleCrystalChange(1, 0)} color={grid[1][0]} />
                    <Crystal className="flex justify-center items-center" key={`x:1-y:1`} onChange={handleCrystalChange(1, 1)} color={grid[1][1]} />
                    <Crystal className="flex justify-center items-center" key={`x:1-y:2`} onChange={handleCrystalChange(1, 2)} color={grid[1][2]} />
            <CrystalButton indexes={result?.steps?.[STEP.RIGHT_TWO]} />
            <CrystalButton indexes={result?.steps?.[STEP.LEFT_THREE]} />
                    <Crystal className="flex justify-center items-center" key={`x:2-y:0`} onChange={handleCrystalChange(2, 0)} color={grid[2][0]} />
                    <Crystal className="flex justify-center items-center" key={`x:2-y:1`} onChange={handleCrystalChange(2, 1)} color={grid[2][1]} />
                    <Crystal className="flex justify-center items-center" key={`x:2-y:2`} onChange={handleCrystalChange(2, 2)} color={grid[2][2]} />
            <CrystalButton indexes={result?.steps?.[STEP.RIGHT_THREE]} />
            <div></div><CrystalButton indexes={result?.steps?.[STEP.BOTTOM_ONE]} /><CrystalButton indexes={result?.steps?.[STEP.BOTTOM_TWO]} /><CrystalButton indexes={result?.steps?.[STEP.BOTTOM_THREE]} /><div></div>
            </CrystalContainer>
                <div className="lg:px-16 lg:py-16 p-2">

                <Actions>
                <button className={`${isValid ? 'bg-blue-500 hover:bg-blue-400 text-white  border-blue-700 hover:border-blue-500' : 'bg-gray-800 hover:bg-gray-700 border-gray-900 hover:border-gray-800 text-white'} font-bold py-2 px-4 border-b-4 rounded`} onClick={toggleResolver} {...((!isValid || isSolved) && {
                        disabled: 'disabled'
                    })}>{(!isValid && 'Not valid') || (resolving ? 'Running...' : 'Run')}</button>
                </Actions>
            </div>
        </div>
    );
}

export default Game;