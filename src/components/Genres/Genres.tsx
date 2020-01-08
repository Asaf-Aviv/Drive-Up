import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { genreIdToString } from 'utils'

type Props = {
  genres: number[]
  mediaType: 'shows' | 'movies'
  className?: string
}

const Genres = ({ genres, mediaType, className }: Props) => (
  <Container className={className}>
    {genres.map(id => (
      <ButtonLink
        key={id}
        to={`/${mediaType}?with_genres=${id}`}
      >
        {genreIdToString(id)}
      </ButtonLink>
    ))}
  </Container>
)

const Container = styled.div`
  margin-bottom: 0.75rem;
`

const ButtonLink = styled(Link)`
  ${(props) => {
    const { textColors, colors } = props.theme

    return css`
      user-select: none;
      margin-bottom: 1rem;
      color: ${textColors.primary};
      border: 1px solid ${colors.primary};
      padding: 0.25rem 1rem;
      text-decoration: none;
      font-weight: 600;
      font-size: 12px;
      display: inline-block;
      box-shadow: 0 2px 8px 1px #a50000;
      transition: background 150ms;
      &:not(:last-of-type) {
        margin-right: 1rem;
      }
      &:hover,
      &:active {
        background: ${colors.primary};
      }
      &:active {
        transform: translateY(1px);
      }
    `
  }}
`

export default Genres
