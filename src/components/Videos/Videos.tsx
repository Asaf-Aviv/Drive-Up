import React from 'react'
import styled from 'styled-components'
import LazyLoad from 'react-lazyload'
import { Video } from 'store/types'
import { SectionTitle } from 'components'

type Props = {
  videos: Video[]
}

const Videos = ({ videos }: Props) => (
  <LazyLoad offset={400} once>
    <SectionTitle>
      Videos
    </SectionTitle>
    <VideosGrid>
      {videos.map(({ name, src }) => (
        <Li key={src}>
          <Iframe
            title={name}
            allowFullScreen
            src={src}
          />
        </Li>
      ))}
    </VideosGrid>
  </LazyLoad>
)

const Li = styled.li`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 56.25% // 9 / 16 * 100%;
`

const Iframe = styled.iframe`
  box-shadow: 0 2px 10px black;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  display: block;
`

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
