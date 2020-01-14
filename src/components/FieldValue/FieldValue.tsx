import React from 'react'
import styled from 'styled-components'

type Props = {
  field: string
  value: string
  delimiter?: string
}

const FieldValue = ({ field, value, delimiter = ':' }: Props) => {
  if (!value) return null

  return (
    <>
      <StyledSpan>
        {field}
        {delimiter}
      </StyledSpan>
      <span>{value}</span>
    </>
  )
}

const StyledSpan = styled.span`
  color: #00fff8;
  margin-right: 0.5rem;
`

export default FieldValue
