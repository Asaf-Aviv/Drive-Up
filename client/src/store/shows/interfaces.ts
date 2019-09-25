import {
  Company,
  Genre,
  Image,
  Video,
  Results,
} from '../movies/interfaces';

export interface ShowShowcase {
  original_name: string;
  genre_ids: number[];
  name: string;
  popularity: number;
  origin_country: string[];
  vote_count: number;
  first_air_date: string;
  backdrop_path: string | null;
  original_language: string;
  id: number;
  vote_average: number;
  overview: string;
  poster_path: string | null;
}

export interface Show {
  backdrop_path: string | null;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
  }[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  last_air_date: string;
  name: string;
  next_episode_to_air: unknown;
  networks: Company[];
  number_of_episodes: number;
  number_of_seasons: number;
  images: {
    posters: Image[];
    backdrops: Image[];
  };
  similar: Results<ShowShowcase[]>;
  recommendations: Results<ShowShowcase[]>;
  videos: {
    results: Video[];
  };
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Company[];
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
  }[];
  status: string;
  type: string;
  vote_average: number;
  vote_count: number;
}
