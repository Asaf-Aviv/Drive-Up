import React from 'react'
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'
import { ShortMedia } from 'store/types'
import { Genres, Poster } from 'components'

type Props = {
  mediaType: 'movie' | 'show'
} & ShortMedia

const MediaCard = ({
  id,
  name,
  originalLanguage,
  overview,
  poster,
  date,
  genres,
  mediaType,
}: Props) => {
  const dateCategory = mediaType === 'movie' ? 'Release Date' : 'Air Date'
  const pluralMediaType = `${mediaType}s` as 'movies' | 'shows'
  const linkHref = `/${mediaType}/${id}`

  return (
    <Card>
      <PosterLink to={linkHref}>
        <LazyLoad offset={400} once>
          <Poster poster={poster} alt={name} />
        </LazyLoad>
      </PosterLink>
      <CardBody>
        <Link to={linkHref}>
          <MediaTitle>{name}</MediaTitle>
        </Link>
        <StyledGenres mediaType={pluralMediaType} genres={genres} />
        <p>{overview}</p>
        <CardFooter>
          <span>{`${dateCategory} - ${date}`}</span>
          <span>{`Language - ${originalLanguage.toUpperCase()}`}</span>
          <StyledLink to={linkHref}>Read More</StyledLink>
        </CardFooter>
      </CardBody>
    </Card>
  )
}

const MediaTitle = styled.h2`
  margin: 1rem 0;
`

const StyledGenres = styled(Genres)`
  margin-bottom: 0.25rem;
`

const StyledLink = styled(Link)`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.secondary};
`

const PosterLink = styled(Link)`
  flex-shrink: 0;
`

const Card = styled.article`
  position: relative;
  margin-bottom: 1rem;
  width: 100%;
  display: flex;
  background: ${({ theme }) => theme.colors.primaryDark};
  overflow: hidden;
  border-right: 3px solid ${({ theme }) => theme.colors.primaryLight};
  box-shadow: 0 2px 10px black;
`

const CardBody = styled.div`
  padding: 0 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const CardFooter = styled.div`
  padding: 1rem 0 0.5rem;
  display: flex;
  margin-top: auto;
  > * {
    margin-right: 1rem;
    &:last-child {
      margin-left: auto;
    }
  }
`

export default MediaCard
