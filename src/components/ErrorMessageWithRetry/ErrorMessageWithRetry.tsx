import React from 'react'
import styled from 'styled-components'
import { Button } from 'components'

type Props = {
  mediaType: string
  retry: () => void
}

const ErrorMessageWithRetry = ({ mediaType, retry }: Props) => (
  <Wrapper>
    <Container>
      <p>Failed to fetch {mediaType}</p>
      <Button onClick={retry}>Retry</Button>
    </Container>
  </Wrapper>
)

const Wrapper = styled.div`

`

const Container = styled.div`
  margin: 1.5rem auto;
  display: inline-flex;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
  align-items: flex-start;
  text-align: center;
  > p {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.secondary}
  }
  > button {
    margin: 0 auto;
  }
`

export default ErrorMessageWithRetry
