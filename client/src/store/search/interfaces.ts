import { MovieShowcase } from '../movies/interfaces';
import { PersonSummary } from '../persons/interfaces';
import { ShowShowcase } from '../shows/interfaces';

interface MediaType<T = 'movie' | 'tv' | 'person'> {
  media_type: T;
}

export type SearchResults =
  | MovieShowcase & MediaType<'movie'>
  | ShowShowcase & MediaType<'tv'>
  | PersonSummary & MediaType<'person'>;
