import React from 'react';
import styled from 'styled-components'
import { COLOR } from '../constants'

const Container = styled.div`
  background: ${props => props.color};
`;

export const COLORS_ORDER = [
  COLOR.RED,
  COLOR.BLUE,
  COLOR.YELLOW
]

export const COLORS_ORDER_BY_KEY = COLORS_ORDER.reduce((memo, color, index) => ({
  ...memo,
  [color]: index
}), {})

function Crystal({ color = COLOR.RED, onChange, x, y }) {

  const handleClick = () => {
    const currentColorIndex = COLORS_ORDER_BY_KEY[color]
    const newColorIndex = currentColorIndex === COLORS_ORDER.length - 1 ? 0 : currentColorIndex + 1
    const newColor = COLORS_ORDER[newColorIndex]
    onChange(newColor)
  }

  return (
    <Container onClick={handleClick} color={color}>
      {color}
      <div>
        x: {x}
      </div>
      <div>
        y: {y}
      </div>
    </Container>
  );
}

export default Crystal;