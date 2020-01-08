import styled from 'styled-components'

const TransparentBG = styled.div`
  position: relative;
  flex: 1;
  height: 100%;
  display: flex;
  align-items: flex-end;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.7) 25%,
    rgba(0, 0, 0, 0.1) 100%
  );
`

export default TransparentBG
