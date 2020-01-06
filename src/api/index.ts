import axios, { AxiosInstance } from 'axios'
import {
  formatPerson,
  formatShortMedia,
  formatFullMedia,
  formatSeason,
  formatCollection,
  formatPersonSummary,
} from './formatters'

const formatPageInfo = res => ({
  page: res.page,
  totalPages: res.total_pages,
  totalResults: res.total_results,
  isLastPage: res.page === res.total_pages,
})

const formatResponse = res => ({
  ...formatPageInfo(res),
  results: res.results.map(formatShortMedia),
})

const formatPersonResponse = res => ({
  ...formatPageInfo(res),
  results: res.results.map(formatPersonSummary),
})

const formatPersonInfo = person => ({
  id: person.id,
  name: person.name,
  poster: person.profile_path,
})

const formatSearchResponse = (res) => {
  const mapper = {
    movie: 'movies',
    tv: 'shows',
    person: 'persons',
  }

  return {
    ...formatPageInfo(res),
    ...res.results.reduce((results, { media_type, ...item }) => {
      const formattedItem = media_type === 'person'
        ? formatPersonInfo(item)
        : formatShortMedia(item)

      results[mapper[media_type]].push(formattedItem)
      return results
    }, { movies: [], shows: [], persons: [] }),
  }
}

class TheMovieDB {
  fetcher: AxiosInstance

  constructor() {
    this.fetcher = axios.create({
      baseURL: 'https://api.themoviedb.org/3',
      params: {
        api_key: process.env.REACT_APP_API_KEY as string,
      },
      validateStatus: status =>
        (status >= 200 && status < 300) || status === 404,
    })

    this.fetcher.interceptors.response.use(res =>
      (res.status === 404 ? null : res.data))
  }

  imgURL = 'https://image.tmdb.org/t/p'

  fetchTrendings = (mediaType: 'movie' | 'tv', timeWindow: 'week' | 'day') =>
    this.fetcher(`/trending/${mediaType}/${timeWindow}`)
      .then(res => (res ? res.results.map(formatShortMedia) : null))

  search = (category: string, params: any, page: number) =>
    this.fetcher(`/search/${category}`, {
      params: { ...params, page },
    }).then(formatSearchResponse)

  fetchMoviesByQuery = (params: any, page: number) =>
    this.fetcher('/discover/movie', {
      params: { ...params, page },
    }).then(formatResponse)

  fetchShowsByQuery = (params: any, page: number) =>
    this.fetcher('/discover/tv', {
      params: { ...params, page },
    }).then(formatResponse)

  fetchShowSeason = (showId: string, seasonNumber: string) =>
    this.fetcher
      .get(`/tv/${showId}?append_to_response=season/${seasonNumber}`)
      .then((res) => {
        const season = res?.[`season/${seasonNumber}`]
        return season ? formatSeason(season, res.name, res.id) : null
      })

  fetchMovieById = (movieId: string | number) =>
    this.fetcher(`/movie/${movieId}`, {
      params: {
        append_to_response:
          'images,similar,recommendations,videos,credits,release_dates',
      },
    }).then(res => (res ? formatFullMedia(res) : res))

    fetchShowById = (showId: number | string) =>
      this.fetcher(`/tv/${showId}`, {
        params: {
          append_to_response: 'images,similar,recommendations,videos,credits',
        },
      }).then(res => (res ? formatFullMedia(res) : res))

  fetchRelatedMovies = (movieId: number, relatedField: any, page: number) =>
    this.fetcher
      .get(`/movie/${movieId}/${relatedField}`, { params: { page } })
      .then(res => (res ? formatShortMedia(res.results) : null))

  fetchRelatedShows = (showId: number, relatedField: any, page: number) =>
    this.fetcher
      .get(`/tv/${showId}/${relatedField}`, { params: { page } })
      .then(res => (res ? formatShortMedia(res.results) : null))

  fetchMoviesByCategory = (category: string, page: number) =>
    this.fetcher(`/movie/${category}`, {
      params: {
        page,
      },
    }).then(formatResponse)

  fetchShowsByCategory = (category: string, page: number) =>
    this.fetcher(`/tv/${category}`, {
      params: {
        page,
      },
    }).then(formatResponse)

  fetchPopularPersons = (page: number) =>
    this.fetcher('/person/popular', {
      params: {
        page,
      },
    }).then(formatPersonResponse)

  fetchPersonById = (personId: number | string) =>
    this.fetcher(`/person/${personId}`, {
      params: {
        append_to_response: 'images,movie_credits,tv_credits,videos',
      },
    }).then(res => (res ? formatPerson(res) : res))

  fetchMovieCollection = (collectionId: string) =>
    this.fetcher(`/collection/${collectionId}`)
      .then(res => res ? formatCollection(res) : null)
}

const TMDB = new TheMovieDB()

if (process.env.NODE_ENV !== 'production') {
  window.TMDB = TMDB
}

declare global {
  interface Window {
    TMDB: TheMovieDB
  }
}

export default TMDB
