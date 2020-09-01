import { STEP, COLOR } from '../constants';

export const moveLeft = (rowIndex) => (grid) => {
    const row = [...grid][rowIndex]
    grid[rowIndex] = [row[1], row[2], row[0]]
    return grid
} 

export const moveRight = (rowIndex) => (grid) => {
    const row = [...grid][rowIndex]
    grid[rowIndex] = [row[2], row[0], row[1]]
    return grid
}

export const moveUp = (columnIndex) => (grid) => {
    let newGrid = cloneGrid(grid)


    const oldColumns = [grid[0][columnIndex], grid[1][columnIndex], grid[2][columnIndex]]

    newGrid[0][columnIndex] = oldColumns[1]
    newGrid[1][columnIndex] = oldColumns[2]
    newGrid[2][columnIndex] = oldColumns[0]

    return newGrid
}

const cloneGrid = (grid) => {
    return [
        [...grid[0]],
        [...grid[1]],
        [...grid[2]],
    ]
}

export const moveDown = (columnIndex) => (grid) => {
    let newGrid = cloneGrid(grid)

    const oldColumns = [grid[0][columnIndex], grid[1][columnIndex], grid[2][columnIndex]]
        
    newGrid[0][columnIndex] = oldColumns[2]
    newGrid[1][columnIndex] = oldColumns[0]
    newGrid[2][columnIndex] = oldColumns[1]

    return newGrid
}

const STEP_ACTION_MAPPER = {
    [STEP.LEFT_ONE]: moveLeft(0),
    [STEP.LEFT_TWO]: moveLeft(1),
    [STEP.LEFT_THREE]: moveLeft(2),
    // --
    [STEP.RIGHT_ONE]: moveRight(0),
    [STEP.RIGHT_TWO]: moveRight(1),
    [STEP.RIGHT_THREE]: moveRight(2),
    // --
    [STEP.TOP_ONE]: moveUp(0),
    [STEP.TOP_TWO]: moveUp(1),
    [STEP.TOP_THREE]: moveUp(2),
    // --
    [STEP.BOTTOM_ONE]: moveDown(0),
    [STEP.BOTTOM_TWO]: moveDown(1),
    [STEP.BOTTOM_THREE]: moveDown(2),
}

export function useStep(grid, step) {
    return STEP_ACTION_MAPPER[step](grid)
}

export function isSolved(grid) {
    // horizontal
    if (grid[0][0] === grid[0][1] && grid[0][1] === grid[0][2]) {
        return (
            (grid[1][0] === grid[1][1] && grid[1][1] === grid[1][2]) &&
            (grid[2][0] === grid[2][1] && grid[2][1] === grid[2][2])
        )
    }
    // vertical
    return (
        (grid[0][0] === grid[1][0] && grid[1][0] === grid[2][0]) &&
        (grid[0][1] === grid[1][1] && grid[1][1] === grid[2][1]) &&
        (grid[0][2] === grid[1][2] && grid[1][2] === grid[2][2])
    )
}

function makeRandomStep() {
    const steps = Object.keys(STEP)
    const max = steps.length - 1
    return function() {
        return steps[Math.floor(Math.random() * Math.floor(max))]
    }
}

export const getRandomStep = makeRandomStep()

export function resolve(grid, { maxStep = 5, maxTries = 10000 } = {}) {
    let currentGrid = Array.from(grid)
    let currentStep = 0
    let currentSteps = []
    const result = {
        state: null,
        tries: 0,
        steps: [],
        grid: [],
        debug: []
    }

    while (true) {
        if (isSolved(currentGrid)) {
            result.state = 'WIN'
            break
        }
        if (result.tries >= maxTries) {
            result.state = 'ABORT_MAX_TRIES'
            break;
        }
        result.tries += 1
        if (currentSteps.length >= maxStep) {
            currentGrid = Array.from(grid)
            currentSteps = []
        }
        currentStep = getRandomStep()
        currentSteps.push(currentStep)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        currentGrid = useStep(currentGrid, currentStep)
        
    }
    if (result.state === 'WIN') {
        result.steps = currentSteps
        result.grid = currentGrid
    }
    return result
}

export function isValid(grid) {
    const counters = {
        [COLOR.BLUE]: 0,
        [COLOR.RED]: 0,
        [COLOR.YELLOW]: 0
    }

    for (let y = 0; y < grid.length; y++) {
        const rows = grid[y];
        for (let x = 0; x < rows.length; x++) {
            const color = rows[x]
            counters[color] += 1
            if (counters[color] > 3) {
                return false
            }
        }
    }
    return true
}