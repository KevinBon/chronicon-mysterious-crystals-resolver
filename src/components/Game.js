import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import Crystal from './Crystal'
import { COLOR } from '../constants';
import { resolve, isValid as isCrystalValid, isSolved as isCrystalSolved } from '../utils/crystalResolver'
import Result from './Result'
import Steps from './Steps'


const CrystalContainer = styled.div `
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 1px 1px;
    grid-template-areas: ". . ." ". . ." ". . ."
`;

const Actions = styled.div``;

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
            <div className={`${className} rounded overflow-hidden shadow-lg`}>
                <CrystalContainer className="w-full">
                    {grid.map((rows, x) => rows.map((color, y) => {
                        return <Crystal className="flex justify-center items-center" key={`x:${x}-y:${y}`} onChange={handleCrystalChange(x, y)} color={color} />
                    }))}
                </CrystalContainer>
                {/* <img  src="/img/card-top.jpg" alt="Sunset in the mountains"> */}
                <div className="px-6 py-4">

                    <Actions>
                        <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={toggleResolver} {...((!isValid || isSolved) && {
                            disabled: 'disabled'
                        })}>{(!isValid && 'Not valid') || (resolving ? 'Running...' : 'Run')}</button>
                    </Actions>
                    {/* <Result result={result} /> */}
                        {/* <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                        <p className="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                        </p> */}
                </div>
                <div className="px-6 pb-2">
                    {result.steps && result.steps.length ? <Steps steps={result.steps} /> : null}
                </div>

            </div>
            
    );
}

export default Game;