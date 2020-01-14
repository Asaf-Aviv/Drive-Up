import React from 'react'
import { Image } from 'store/types'
import { SectionTitle, SlideShow, BackDrop, Spacer } from 'components'

type Props = {
  backdrops?: Image[]
  posters?: Image[]
  alt: string
}

const renderSlideShow = (images: Image[], alt: string) =>
  images[0] ? (
    <SlideShow>
      {images.map(({ url }) => (
        <BackDrop key={url} imgPath={url} alt={alt} />
      ))}
    </SlideShow>
  ) : null

const Images = ({ backdrops = [], posters = [], alt }: Props) => {
  if (!backdrops[0] && !posters[0]) return null

  return (
    <>
      <SectionTitle>Images</SectionTitle>
      {renderSlideShow(backdrops, alt)}
      {backdrops[0] && <Spacer />}
      {renderSlideShow(posters, alt)}
    </>
  )
}

export default Images
