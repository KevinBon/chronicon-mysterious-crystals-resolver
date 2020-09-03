import React from 'react';
import styled from 'styled-components'
import { COLOR } from '../constants'

export const COLORS_ORDER = [
  COLOR.RED,
  COLOR.BLUE,
  COLOR.YELLOW
]

export const COLORS_CLASSNAMES = {
  [COLOR.BLUE]: 'bg-blue-500',
  [COLOR.RED]: 'bg-red-500',
  [COLOR.YELLOW]: 'bg-yellow-500'
}

const Container = styled.div`
  min-height: 100px;
`

export const COLORS_ORDER_BY_KEY = COLORS_ORDER.reduce((memo, color, index) => ({
  ...memo,
  [color]: index
}), {})

function Crystal({ color = COLOR.RED, onChange, className }) {

  const handleClick = () => {
    const currentColorIndex = COLORS_ORDER_BY_KEY[color]
    const newColorIndex = currentColorIndex === COLORS_ORDER.length - 1 ? 0 : currentColorIndex + 1
    const newColor = COLORS_ORDER[newColorIndex]
    onChange(newColor)
  }

  const colorBasedClassName = COLORS_CLASSNAMES[color]

  return (
    <Container onClick={handleClick} className={`${colorBasedClassName} select-none cursor-pointer rounded text-white ${className}`}>
      {color}
    </Container>
  );
}

export default Crystal;