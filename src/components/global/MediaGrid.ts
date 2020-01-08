import styled from 'styled-components'

const MediaGrid = styled.ul`
  display: grid;
  grid-gap: 1rem;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  @media (min-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
  @media (min-width: 900px) {
    grid-template-columns: 1fr;
  }
  & > li {
    width: 100%;
    min-height: 139px;
  }
`

export default MediaGrid
