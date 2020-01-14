import React from 'react'
import styled from 'styled-components'
import LazyLoad from 'react-lazyload'
import { Video as IVideo } from 'store/types'
import { SectionTitle, Video } from 'components'

type Props = {
  videos: IVideo[]
}

const Videos = ({ videos }: Props) => {
  if (!videos[0]) return null

  return (
    <LazyLoad offset={400} once>
      <SectionTitle>
        Videos
      </SectionTitle>
      <VideosGrid>
        {videos.map(video => (
          <li key={video.src}>
            <Video {...video} />
          </li>
        ))}
      </VideosGrid>
    </LazyLoad>
  )
}

const VideosGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 1rem;
  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

export default Videos
