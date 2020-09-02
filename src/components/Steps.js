import React from 'react';
import { STEP } from '../constants'

const DIRECTION_MAPPER = {
    TOP: '⬆️',
    RIGHT: '➡️',
    BOTTOM: '⬇️',
    LEFT: '⬅️',
}


const NUMBER_MAPPER = {
    ONE: '1st',
    TWO: '2nd',
    THREE: '3rd',
}

const StepItem = ({ step }) => {
    const [direction, number] = step.split('_')
    return (
        <React.Fragment>
            <span className="mr-2">{DIRECTION_MAPPER[direction]}</span>
            <span>{NUMBER_MAPPER[number]}</span>
        </React.Fragment>
    )
}

const Steps = ({ steps }) => {
    return (
        <ul className="list-inside list-decimal">
            {steps.map((step, index) => (<li className="shadow-xs bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" key={index}><StepItem step={step} /></li>))}
        </ul>
    )
}

export default Steps;