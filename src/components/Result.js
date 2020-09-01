import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
    
`;

const Result = ({ result }) => {
    return (
        <Container>
            {JSON.stringify(result)}
        </Container>
    )
}

export default Result;