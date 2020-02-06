import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import styled from 'styled-components'
import {
  Overview,
  Title,
  Spacer,
  Container,
  ExternalLink,
  FieldValue,
  Section,
  SlideShow,
  MediaSlideItem,
  Videos,
  Poster,
  SectionTitle,
  Loader,
  ErrorMessageWithRetry,
  NotFound,
  Images,
} from 'components'
import {
  requestPersonById,
  selectPersonById,
} from 'store/person/reducers'
import { useShallowEqualSelector } from 'hooks'
import Visible from 'components/Visible'
import { Helmet } from 'react-helmet'

type Params = {
  personId: string
}

const Person = () => {
  const { personId } = useParams<Params>()
  const person = useShallowEqualSelector(selectPersonById(personId))
  const { loading, error } = useShallowEqualSelector(state => state.persons)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestPersonById(personId))
  }, [dispatch, personId])

  const requestPerson = () => {
    dispatch(requestPersonById(personId))
  }

  if (loading) return <Loader withContainer />
  if (error) return <ErrorMessageWithRetry mediaType="person" retry={requestPerson} />
  if (person === null) return <NotFound>Person Not Found</NotFound>
  if (!person) return null

  const renderDetailsField = (field: string, value: string) => (
    <MetaDataContainer>
      <FieldValue field={field} value={value} />
    </MetaDataContainer>
  )

  const {
    name,
    biography,
    poster,
    images,
    birthday,
    homepage,
    movies,
    shows,
    department,
    placeOfBirth,
    alsoKnownAs,
    videos,
  } = person

  return (
    <main>
      <Helmet>
        <title>{`${name} - Drive Up`}</title>
        <meta name="description" content={`Details page about ${name}`} />
      </Helmet>
      <Container>
        <header>
          <Title>{name}</Title>
          <HeaderContent>
            <Poster poster={poster} alt={name} />
            <StyledOverview overview={biography} title="Biography" />
          </HeaderContent>
        </header>
        <Section>
          {renderDetailsField('Name', name)}
          {birthday && renderDetailsField('Birthday', birthday)}
          {department && renderDetailsField('Known for', department)}
          {placeOfBirth && renderDetailsField('Born', placeOfBirth)}
          {alsoKnownAs[0] && renderDetailsField('Also known as', alsoKnownAs.join(', '))}
          {homepage && <ExternalLink href={homepage} text="Homepage" />}
        </Section>
        <Visible when={movies[0] || shows[0]}>
          <Section>
            <Visible when={movies[0]}>
              <SectionTitle>Movies</SectionTitle>
              <SlideShow>
                {movies
                  .filter(movie => movie.backdrop)
                  .map(movie => (
                    <MediaSlideItem key={movie.id} mediaType="movie" {...movie} />
                  ))}
              </SlideShow>
              <Spacer />
            </Visible>
            <Visible when={shows[0]}>
              <SectionTitle>Shows</SectionTitle>
              <SlideShow>
                {shows
                  .filter(show => show.backdrop)
                  .map(show => (
                    <MediaSlideItem key={show.id} mediaType="show" {...show} />
                  ))}
              </SlideShow>
            </Visible>
          </Section>
        </Visible>
        <Visible when={images[0] || videos[0]}>
          <Section>
            <Images posters={images} alt={name} />
            {images[0] && <Spacer />}
            <Videos videos={videos} />
          </Section>
        </Visible>
      </Container>
    </main>
  )
}

const StyledOverview = styled(Overview)`
  margin-left: 2rem;
`

const HeaderContent = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 4rem;
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    ${StyledOverview} {
      margin-left: 0;
      margin-top: 2rem;
    }
  }
`

const MetaDataContainer = styled.div`
  margin-bottom: 0.5rem;
`

export default Person
