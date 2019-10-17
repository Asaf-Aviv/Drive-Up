import { MovieShowcase } from '../movies/interfaces';

export interface Collection {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  parts: MovieShowcase[];
}
