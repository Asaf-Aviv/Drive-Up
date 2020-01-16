import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { genreIdToString } from 'utils'

type Props = {
  genres: number[]
  mediaType: 'shows' | 'movies'
  large?: boolean
  className?: string
}

const Genres = ({ genres, mediaType, large, className }: Props) => (
  <Container className={className}>
    {genres.map(id => (
      <ButtonLink
        key={id}
        to={`/${mediaType}?with_genres=${id}`}
        large={large}
      >
        {genreIdToString(id)}
      </ButtonLink>
    ))}
  </Container>
)

const Container = styled.div`
  margin-bottom: 0.75rem;
`

const ButtonLink = styled(Link)<{ large?: boolean }>`
  ${(props) => {
    const { large } = props
    const { textColors, colors } = props.theme

    return css`
      user-select: none;
      margin-bottom: 1rem;
      padding: 0.5rem 1rem;
      color: ${textColors.primary};
      border: 1px solid ${colors.primaryLight};
      padding: 0.25rem 1rem;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      display: inline-block;
      box-shadow: 0 4px 10px -2px #0396ff;
      background: ${colors.body};
      transition: background 150ms;
      @media (min-width: 600px) {
        ${large && `
          font-size: 16px;
          padding: 0.5rem 1.25rem;
        `}
      }
      &:not(:last-of-type) {
        margin-right: 1rem;
      }
      &:hover,
      &:active {
        background: #064e8a;
      }
      &:active {
        transform: translateY(1px);
      }
    `
  }}
`

export default Genres
