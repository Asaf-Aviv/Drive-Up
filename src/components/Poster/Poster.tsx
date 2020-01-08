import React from 'react'
import styled from 'styled-components'
import { getImgUrl } from 'utils'

type Props = {
  poster: string | null
  alt: string
  className?: string
  width?: number
}

const Poster = ({ poster, alt, width, className }: Props) => (
  <StyledPoster
    className={className}
    src={getImgUrl(poster, width || 185)}
    alt={alt}
    title={alt}
  />
)

const StyledPoster = styled.img`
  max-width: 100%;
  box-shadow: 0 2px 10px black;
  min-height: 100px;
`

export default Poster
