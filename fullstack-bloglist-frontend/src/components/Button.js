/* eslint-disable react/prop-types */
import React from 'react'
import { Button } from 'react-bootstrap'

const CustButton = (props) => (
  <Button variant={props.variant} onClick={props.handleClick} size={props.size}>
    {props.text}
  </Button>
)

export default CustButton