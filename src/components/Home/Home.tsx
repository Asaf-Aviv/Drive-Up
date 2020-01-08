import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  selectWeeklyTrendingMovies,
  selectWeeklyTrendingShows,
  requestTrendings,
} from 'store/trending/reducers'
import {
  Container,
  BackDrop,
  SlideShow,
  FeaturedSlider,
  SectionTitle,
  Section,
  Spacer,
} from 'components'
import { useShallowEqualSelector } from 'hooks'


const WeeklyTrendingMovies = () => {
  const dispatch = useDispatch()
  const movies = useShallowEqualSelector(selectWeeklyTrendingMovies)

  useEffect(() => {
    if (movies.length) return

    dispatch(requestTrendings('weeklyTrendingMovies'))
  }, [dispatch, movies.length])

  return (
    <>
      <SectionTitle>Trending Movies This Week</SectionTitle>
      <SlideShow>
        {movies.map(movie => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <BackDrop imgPath={movie.backdrop} alt={movie.name} withCaption />
          </Link>
        ))}
      </SlideShow>
    </>
  )
}
const WeeklyTrendingShows = () => {
  const dispatch = useDispatch()
  const shows = useShallowEqualSelector(selectWeeklyTrendingShows)

  useEffect(() => {
    if (shows.length) return

    dispatch(requestTrendings('weeklyTrendingShows'))
  }, [dispatch, shows.length])

  return (
    <>
      <SectionTitle>Trending Shows This Week</SectionTitle>
      <SlideShow>
        {shows.map(show => (
          <Link key={show.id} to={`/show/${show.id}`}>
            <BackDrop imgPath={show.backdrop} alt={show.name} withCaption />
          </Link>
        ))}
      </SlideShow>
    </>
  )
}

const Home = () => (
  <main>
    <Section>
      <FeaturedSlider />
    </Section>
    <Container>
      <Section>
        <WeeklyTrendingMovies />
        <Spacer />
        <WeeklyTrendingShows />
      </Section>
    </Container>
  </main>
)

export default Home
