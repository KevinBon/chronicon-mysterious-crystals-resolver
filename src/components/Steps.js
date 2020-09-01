import React from 'react';

const Steps = ({ steps }) => {
    return (
        <ul className="list-inside list-decimal">
            {steps.map((step, index) => (<li className="shadow-xs bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" key={index}>{step}</li>))}
        </ul>
    )
}

export default Steps;