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

export interface Crew {
  credit_id: string;
  department: string;
  gender: 0 | 1 | 2;
  id: number;
  job: string;
  name: string;
  profile_path: string;
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

export interface Credits {
  crew: Crew[];
  cast: {
    cast_id: number;
    character: string;
    credit_id: string;
    gender: 0 | 1 | 2;
    id: number;
    job: string;
    name: string;
    order: number;
    profile_path: string;
  }[];
}

export interface PG {
  results: {
    iso_3166_1: string;
    release_dates: Certification[];
  }[];
}

export interface Certification {
  certification: string;
  iso_639_1: string;
  note: string;
  release_date: string;
  type: number;
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
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  spoken_languages: {
    name: string;
    iso_639_1: string;
  }[];
  credits: Credits;
  release_date: string;
  revenue: number;
  runtime: number | null;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  release_dates: PG;
}
