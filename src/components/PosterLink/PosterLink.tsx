import React from 'react'
import LazyLoad from 'react-lazyload'
import { Link } from 'react-router-dom'
import { Poster } from 'components'

type Props = {
  to: string
  poster: string | null
  alt: string
}

const PosterLink = ({ to, poster, alt }: Props) => (
  <Link to={to}>
    <LazyLoad offset={200} once>
      <Poster poster={poster} alt={alt} />
    </LazyLoad>
  </Link>
)

export default PosterLink
