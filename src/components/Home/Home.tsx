import React from 'react'
import {
  Container,
  FeaturedSlider,
  Section,
  WeeklyTrendingMovies,
  WeeklyTrendingShows,
} from 'components'

const Home = () => (
  <main>
    <Section>
      <FeaturedSlider />
    </Section>
    <Container>
      <Section>
        <WeeklyTrendingMovies />
        <WeeklyTrendingShows />
      </Section>
    </Container>
  </main>
)

export default Home
