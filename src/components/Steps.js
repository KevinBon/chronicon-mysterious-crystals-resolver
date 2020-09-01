import React from 'react';

const Steps = ({ steps }) => {
    return (
        <ol>
            {steps.map((step, index) => (<li key={index}>{step}</li>))}
        </ol>
    )
}

export default Steps;