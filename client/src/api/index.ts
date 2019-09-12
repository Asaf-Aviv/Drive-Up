import axios from 'axios';
import { ShowShowcase } from '../store/shows/interfaces';
import { MovieShowcase } from '../store/movies/interfaces';
import { Person, PersonSummary } from '../store/persons/interfaces';

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
    this.fetcher.get<BaseResponse<MovieShowcase>>('/discover/movie', {
      params: {
        page,
      },
    });

  fetchShows = (page: number) =>
    this.fetcher.get<BaseResponse<ShowShowcase>>('/discover/tv', {
      params: {
        page,
      },
    });

  fetchPersons = (page: number) =>
    this.fetcher.get<BaseResponse<PersonSummary>>('/person/popular', {
      params: {
        page,
      },
    });

  fetchPerson = (personId: string) =>
    this.fetcher.get<Person>(`/person/${personId}`);
}

const TMDB = new TheMovieDB();

export default TMDB;
