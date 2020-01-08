import React from 'react'
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazyload'
import { PosterWithTitle } from 'components'

type Props = {
  id: string
  name: string
  poster: string
}

const PersonCard = ({
  id,
  name,
  poster,
}: Props) => (
  <Link to={`/person/${id}`}>
    <LazyLoad offset={400} once>
      <PosterWithTitle poster={poster} title={name} />
    </LazyLoad>
  </Link>
)

export default PersonCard
