import React from 'react'
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazyload'
import { BackDrop } from 'components'

type Props = {
  id: number | string
  name: string
  backdrop: string | null
  mediaType: 'movie' | 'show'
}

const MediaSlideItem = ({
  id,
  name,
  backdrop,
  mediaType,
}: Props) => {
  // TODO: filter items without backdrop before
  if (backdrop === null) return null

  return (
    <Link to={`/${mediaType}/${id}`}>
      <LazyLoad offset={400} once>
        <BackDrop imgPath={backdrop} alt={name} withCaption />
      </LazyLoad>
    </Link>
  )
}

export default MediaSlideItem
