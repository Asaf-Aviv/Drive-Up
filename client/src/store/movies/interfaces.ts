export interface Results<T> {
  results: T;
  page: number;
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Series {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface Company {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
}

export interface Image {
  file_path: string;
  width: number;
  height: number;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface MovieShowcase {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: Series | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  images: {
    posters: Image[];
    backdrops: Image[];
  };
  videos: {
    results: Video[];
  };
  similar: Results<MovieShowcase[]>;
  recommendations: Results<MovieShowcase[]>;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: Company[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
