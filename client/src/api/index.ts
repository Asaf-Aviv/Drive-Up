import axios from 'axios';
import { Movie, MovieShowcase } from '../store/movies/interfaces';
import { RelatedFields } from '../store/movies/actions';
import { Show, ShowShowcase } from '../store/shows/interfaces';
import { PersonSummary, Person } from '../store/persons/interfaces';
import { Collection } from '../store/collections/interfaces';

export interface BaseResponse<T> {
  data: {
    results: T[];
    page: number;
    total_results: number;
    total_pages: number;
  };
}

interface MovieImage {
  file_path: string;
}

interface ImagesResponse {
  backdrops: MovieImage[];
  posters: MovieImage[];
}

class TheMovieDB {
  imgURL = 'https://image.tmdb.org/t/p';

  private fetcher = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
      api_key: process.env.REACT_APP_API_KEY as string,
    },
  });

  search = (category: string, params: any, page: number) =>
    this.fetcher.get(`/search/${category}`, {
      params: { ...params, page },
    });

  fetchMoviesByQuery = (params: any, page: number) =>
    this.fetcher.get<BaseResponse<MovieShowcase>>('/discover/movie', {
      params: { ...params, page },
    });

  fetchShowsByQuery = (params: any, page: number) =>
    this.fetcher.get<BaseResponse<MovieShowcase>>('/discover/tv', {
      params: { ...params, page },
    });

  fetchShowSeason = (showId: number, seasonNumber: number) =>
    this.fetcher.get(`/tv/${showId}/season/${seasonNumber}`);

  fetchMovieImages = (movieId: number | string) =>
    this.fetcher
      .get<ImagesResponse>(`/movie/${movieId}/images`)
      .then(({ data }) => {
        const mapImages = ({ file_path, width, height }: any) => ({
          src: `https://image.tmdb.org/t/p/original/${file_path}`,
          width,
          height,
        });
        const posters = data.posters.map(mapImages);
        const backdrops = data.backdrops.map(mapImages);
        return {
          posters,
          backdrops,
        };
      });

  fetchMovieById = (movieId: string | number) =>
    this.fetcher.get<Movie>(`/movie/${movieId}`, {
      params: {
        append_to_response: 'images,similar,recommendations,videos,credits',
      },
    });

  fetchRelatedMovies = (
    movieId: number,
    relatedField: RelatedFields,
    page: number
  ) =>
    this.fetcher.get(`/movie/${movieId}/${relatedField}`, { params: { page } });

  fetchRelatedShows = (
    showId: number,
    relatedField: RelatedFields,
    page: number
  ) => this.fetcher.get(`/tv/${showId}/${relatedField}`, { params: { page } });

  fetchMoviesByCategory = (category: string, page: number) =>
    this.fetcher.get<BaseResponse<MovieShowcase>>(`/movie/${category}`, {
      params: {
        page,
      },
    });

  fetchShowsByCategory = (category: string, page: number) =>
    this.fetcher.get<BaseResponse<ShowShowcase>>(`/tv/${category}`, {
      params: {
        page,
      },
    });

  fetchShowById = (showId: number | string) =>
    this.fetcher.get<Show>(`/tv/${showId}`, {
      params: {
        append_to_response: 'images,similar,recommendations,videos',
      },
    });

  fetchPopularPersons = (page: number) =>
    this.fetcher.get<BaseResponse<PersonSummary>>('/person/popular', {
      params: {
        page,
      },
    });

  fetchPersonById = (personId: number | string) =>
    this.fetcher.get<Person>(`/person/${personId}`, {
      params: {
        append_to_response: 'images,movie_credits,tv_credits,videos',
      },
    });

  fetchMovieCollection = (collectionId: number | string) =>
    this.fetcher.get<Collection>(`/collection/${collectionId}`)
}

const TMDB = new TheMovieDB();

if (process.env.NODE_ENV !== 'production') {
  window.TMDB = TMDB;
}

declare global {
  interface Window {
    TMDB: TheMovieDB;
  }
}

export default TMDB;
