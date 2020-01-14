import styled from 'styled-components'
import Grid from 'components/global/Grid'

const PersonsGrid = styled(Grid).attrs({
  as: 'ul',
})`
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  @media (min-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`

export default PersonsGrid
