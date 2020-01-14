import React from 'react'
import styled from 'styled-components'
import { Video as IVideo } from 'store/types'

const Video = ({ src, name }: IVideo) => (
  <Container>
    <Iframe
      title={name}
      src={src}
      allowFullScreen
    />
  </Container>
)

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 56.25%;
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

export default Video
