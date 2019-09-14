import axios from 'axios';
import { Show } from '../store/showsByIds/interfaces';
import { Movie } from '../store/moviesByIds/interfaces';
import { ShowShowcase } from '../store/shows/interfaces';
import { MovieShowcase } from '../store/movies/interfaces';
import { PersonSummary } from '../store/persons/interfaces';
import { Person } from '../store/personsByIds/interfaces';

export interface BaseResponse<T> {
  data: {
    results: T[];
    page: number;
    total_results: number;
    total_pages: number;
  };
}

class TheMovieDB {
  private fetcher = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
      api_key: process.env.REACT_APP_API_KEY as string,
    },
  });

  fetchMovies = (page: number) =>
    this.fetcher.get<BaseResponse<MovieShowcase>>('/movie', {
      params: {
        page,
      },
    });

  fetchMovieById = (movieId: number) =>
    this.fetcher.get<Movie>(`/movie/${movieId}`);

  fetchShows = (page: number) =>
    this.fetcher.get<BaseResponse<ShowShowcase>>('/discover/tv', {
      params: {
        page,
      },
    });

  fetchShowById = (showId: number) =>
    this.fetcher.get<Show>(`/show/${showId}`);

  fetchPersons = (page: number) =>
    this.fetcher.get<BaseResponse<PersonSummary>>('/person/popular', {
      params: {
        page,
      },
    });

  fetchPersonById = (personId: number) =>
    this.fetcher.get<Person>(`/person/${personId}`);
}

const TMDB = new TheMovieDB();

export default TMDB;
