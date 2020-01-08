import styled, { css } from 'styled-components'
import { ReactComponent as LoaderSVG } from '../../assets/loader.svg'

const Loader = styled(LoaderSVG)<{ size?: number }>`
  ${(props) => {
    const { size } = props

    return css`
      width: ${size || '36'}px;
      height: ${size || '36'}px;
      @media (min-width: 768px) {
        height: ${size || '46'}px;
        width: ${size || '46'}px;
      }
    `
  }};
`

export default Loader
