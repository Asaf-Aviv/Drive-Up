import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowBackIos } from '@material-ui/icons'
import styled from 'styled-components'
import { ImageHeader } from 'components/MediaHeader/MediaHeader'
import { TransparentBG, Title, Container, ErrorMessageWithRetry } from 'components'
import { selectTodaysTrendingMovies, requestTrendings } from 'store/trending/reducers'
import { useDispatch } from 'react-redux'
import { getImgUrl } from 'utils'
import Loader from 'components/global/Loader'
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector'

const FeaturedSlider = () => {
  const [movieIndex, setMovieIndex] = useState(0)
  const movies = useShallowEqualSelector(selectTodaysTrendingMovies)
  const loading = useShallowEqualSelector(({ trending }) => trending.todaysTrendingMovies.loading)
  const error = useShallowEqualSelector(({ trending }) => trending.todaysTrendingMovies.error)
  const dispatch = useDispatch()

  const fetchTrendings = () => {
    dispatch(requestTrendings('todaysTrendingMovies'))
  }

  useEffect(() => {
    fetchTrendings()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const nextSlide = () => setMovieIndex(prevIndex => prevIndex + 1)
  const prevSlide = () => setMovieIndex(prevIndex => prevIndex - 1)

  return (
    <header>
      <Slider>
        <ArrowButton
          side="left"
          onClick={prevSlide}
          disabled={!movieIndex}
        >
          <ArrowBackIos />
        </ArrowButton>
        <ArrowButton
          side="right"
          onClick={nextSlide}
          disabled={movieIndex === (movies?.length - 1)}
        >
          <ForwardButton />
        </ArrowButton>
        <SliderContainer translateX={`${movieIndex * 100}vw`}>
          {loading && <Loader />}
          {error && (
            <ErrorMessageWithRetry mediaType="featured movies" retry={fetchTrendings} />
          )}
          {movies[0] && movies.slice(0, movieIndex + 2).map(movie => (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <StyledImageHeader as="article" bgImg={getImgUrl(movie.backdrop, 1280)}>
                <TransparentBG>
                  <Container>
                    <DetailsContainer>
                      <StyledTitle as="h2">
                        {movie.name}
                      </StyledTitle>
                    </DetailsContainer>
                  </Container>
                </TransparentBG>
              </StyledImageHeader>
            </Link>
          ))}
        </SliderContainer>
      </Slider>
    </header>
  )
}

const DetailsContainer = styled.div`
  padding: 1rem 0;
`

const StyledImageHeader = styled(ImageHeader)`
  width: 100vw;
  background-size: 100vw;
`

const Slider = styled.div`
  overflow: hidden;
  position: relative;
  height: 40vh;
  @media (min-width: 600px) {
    background-size: 100vw;
  }
  @media (min-width: 900px) {
    height: 70vh;
  }
  @media only screen 
  and (min-device-width: 1024px) 
  and (max-device-height: 1366px) 
  and (-webkit-min-device-pixel-ratio: 2)
  and (orientation: portrait) {
    height: 40vh;
  }
`

const ForwardButton = styled(ArrowBackIos)`
  transform: rotate(180deg);
`

const SliderContainer = styled.div<{ translateX: number | string }>`
  height: 100%;
  position: absolute;
  display: flex;
  transition: transform 250ms;
  transform: translateX(${props => `-${props.translateX}`});
  justify-content: center;
  align-items: center;
  min-width: 100%;
`

const ArrowButton = styled.button<{ side: 'left' | 'right' }>`
  position: absolute;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 150ms;
  background: transparent;
  border: none;
  top: 50%;
  padding: 0 1rem;
  transform: translateY(-50%);
  z-index: 10;
  ${({ side }) => `${side}: 0;`};
  color: ${({ theme }) => theme.textColors.secondary};
  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.textColors.primary};
  }
  &:disabled {
    color: #494949;
  }
  & .MuiSvgIcon-root {
    width: 2.5rem;
    height: 2.5rem;
  }
`

const StyledTitle = styled(Title)`
  margin: 0;
`

export default FeaturedSlider
