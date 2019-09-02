import axios from 'axios';
import { MovieShowcase } from '../store/movies/interfaces';

export interface FetchMoviesResponse {
  data: {
    page: number;
    results: MovieShowcase[];
    total_results: number;
    total_pages: number;
  };
}

class TmdbApi {
  private fetcher = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
      api_key: process.env.REACT_APP_API_KEY as string,
    },
  })

  fetchMovies = (page: number) => this.fetcher.get<FetchMoviesResponse>('/discover/movie', {
    params: {
      page,
    },
  });
}

const TMDB = new TmdbApi();

export default TMDB;
