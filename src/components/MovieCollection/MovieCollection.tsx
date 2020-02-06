import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { useShallowEqualSelector } from 'hooks'
import {
  MediaHeader,
  MediaCard,
  Container,
  SectionDivider,
  TransparentBG,
  Overview,
  Section,
  SectionTitle,
  MediaGrid,
  PosterLink,
} from 'components'
import { getImgUrl } from 'utils'
import { WindowWidthContext } from 'components/WindowWidthProvider'
import { ImageHeader } from 'components/MediaHeader'
import { requestCollection, selectCollection } from 'store/collections/reducers'
import NotFound from 'components/global/NotFound'
import { Helmet } from 'react-helmet'

type Params = {
  collectionId: string
}

const MovieCollection = () => {
  const { collectionId } = useParams<Params>()
  const { loading, error } = useShallowEqualSelector(state => state.collections)
  const collection = useShallowEqualSelector(selectCollection(collectionId))
  const dispatch = useDispatch()
  const windowWidth = useContext(WindowWidthContext)

  useEffect(() => {
    if (collection === undefined && !error && !loading) {
      dispatch(requestCollection(collectionId))
    }
  }, [collection, collectionId, dispatch, error, loading])

  if (error) return <span>error</span>
  if (loading) return <span>Loading</span>
  if (collection === null) return <NotFound>Collection Not Found</NotFound>
  if (!collection) return null

  const {
    backdrop,
    name,
    poster,
    parts,
    overview,
  } = collection

  return (
    <main>
      <Helmet>
        <title>{`${name} - Drive Up`}</title>
        <meta name="description" content={`Details page about ${name} collection`} />
      </Helmet>
      <ImageHeader bgImg={getImgUrl(backdrop, 1280)}>
        <TransparentBG />
      </ImageHeader>
      <MediaHeader
        name={name}
        poster={poster}
        type="movie"
      />
      <Container>
        <Overview overview={overview} />
        <SectionDivider />
        <Section>
          <SectionTitle>Collection Movies</SectionTitle>
          <MediaGrid as="div">
            {parts.map(movie => (windowWidth < 900
              ? (
                <PosterLink
                  key={movie.id}
                  to={`/movie/${movie.id}`}
                  poster={movie.poster}
                  alt={movie.name}
                />
              ) : <MediaCard key={movie.id} mediaType="movie" {...movie} />
            ))}
          </MediaGrid>
        </Section>
      </Container>
    </main>
  )
}

export default MovieCollection
