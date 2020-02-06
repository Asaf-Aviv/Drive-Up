import React from 'react'
import {
  Container,
  FeaturedSlider,
  Section,
  WeeklyTrendingMovies,
  WeeklyTrendingShows,
} from 'components'
import { Helmet } from 'react-helmet'

const Featured = () => (
  <main>
    <Helmet>
      <title>Featured - Drive Up</title>
      <meta name="description" content="Featured movies and shows" />
    </Helmet>
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

export default Featured
