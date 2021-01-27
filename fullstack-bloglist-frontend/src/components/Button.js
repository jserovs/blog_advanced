/* eslint-disable react/prop-types */
import React from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

export default Button