import { Image, MovieShowcase, Video } from '../movies/interfaces';
import { ShowShowcase } from '../shows/interfaces';

export interface PersonSummary {
  profile_path: string;
  adult: boolean;
  id: number;
  name: string;
  popularity: number;
  known_for_department: string;
  gender: 0 | 1 | 2;
}

export interface Person {
  birthday: string | null;
  known_for_department: string;
  deathday: string | null;
  id: number;
  name: string;
  also_known_as: string[];
  gender: 0 | 1 | 2;
  biography: string;
  popularity: number;
  place_of_birth: string | null;
  profile_path: string | null;
  adult: boolean;
  imdb_id: string;
  homepage: string | null;
  images: {
    profiles: Image[];
  };
  movie_credits: {
    cast: MovieShowcase[];
  };
  tv_credits: {
    cast: ShowShowcase[];
  };
  videos: Video[];
}
